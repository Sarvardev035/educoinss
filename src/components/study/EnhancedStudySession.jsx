import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EnhancedStudySession - Pomodoro study tracker with camera monitoring
 * Features:
 * - Camera monitoring for active studying verification
 * - Pomodoro timer (25 min work / 5 min break)
 * - Background study sounds
 * - Coin earning based on active studying
 * - Face detection to prevent cheating
 */
export default function EnhancedStudySession() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  // Timer & Pomodoro state
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [totalSessionTime, setTotalSessionTime] = useState(0);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  // Camera & activity detection
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isUserActive, setIsUserActive] = useState(false);
  const [activityWarning, setActivityWarning] = useState(null);
  const [detectionConfidence, setDetectionConfidence] = useState(0);

  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSound, setCurrentSound] = useState('forest');

  // Initialize camera on mount
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error('Camera error:', err);
        setCameraError('Camera access denied. Please enable camera permissions.');
      }
    };

    initCamera();

    return () => {
      // Cleanup camera on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Phase complete
          handlePhaseComplete();
          return isWorkPhase ? 5 * 60 : 25 * 60; // Switch to break or work
        }
        return prev - 1;
      });
      setTotalSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isWorkPhase]);

  // Activity detection using simple motion detection
  useEffect(() => {
    if (!cameraActive || !videoRef.current) return;

    const detectActivity = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple face/presence detection (look for skin tone pixels)
        let skinPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Simple skin tone detection
          if (r > 95 && g > 40 && b > 20 && r - b > 15 && r > g) {
            skinPixels++;
          }
        }

        const totalPixels = canvas.width * canvas.height;
        const presence = (skinPixels / totalPixels) * 100;

        // If 5-40% of frame is "face/presence", user is active
        const active = presence > 5 && presence < 40;
        setIsUserActive(active);
        setDetectionConfidence(Math.min(100, Math.round(presence)));

        if (!active && isRunning && isWorkPhase) {
          setActivityWarning('Please face the camera to continue earning coins');
        } else {
          setActivityWarning(null);
        }

        // Award coins only during active work phase
        if (active && isRunning && isWorkPhase) {
          setCoinsEarned((prev) => prev + 0.001); // Gradual coin earning
        }
      }
    };

    const detectionInterval = setInterval(detectActivity, 1000);
    return () => clearInterval(detectionInterval);
  }, [cameraActive, isRunning, isWorkPhase]);

  const handlePhaseComplete = () => {
    if (isWorkPhase) {
      setSessionsCompleted((prev) => prev + 1);
      playNotification();
      setActivityWarning('Great work! Time for a break. Step away and relax.');
    } else {
      playNotification();
      setActivityWarning('Break complete! Ready for another session?');
    }
    setIsWorkPhase(!isWorkPhase);
  };

  const playNotification = () => {
    // Use Web Audio API to play a notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleBackgroundSound = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleStartSession = () => {
    if (!cameraActive) {
      setCameraError('Please enable camera before starting.');
      return;
    }
    setIsRunning(true);
    if (soundEnabled) {
      toggleBackgroundSound();
    }
  };

  const handleStopSession = () => {
    setIsRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleEndSession = () => {
    // End session and return with results
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    navigate('/student/dashboard', {
      state: {
        sessionResults: {
          coinsEarned: Math.round(coinsEarned),
          timeStudied: totalSessionTime,
          sessionsCompleted,
        },
      },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface via-surface to-surface-container flex flex-col items-center justify-center px-4 py-8">
      {/* Background audio element */}
      <audio
        ref={audioRef}
        loop
        src={`/sounds/study-${currentSound}.wav`}
        onError={() => console.warn('Background sound not found')}
      />

      {/* Main Session Container */}
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2">
            Focus Session
          </h1>
          <p className="text-outline-variant">
            Stay focused and earn coins while you study
          </p>
        </div>

        {/* Camera Feed Section */}
        <div className="mb-8 rounded-2xl overflow-hidden border-2 border-primary/30">
          {cameraError ? (
            <div className="bg-surface-container p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-red-400 mb-2 block">
                videocam_off
              </span>
              <p className="text-red-400 text-sm">{cameraError}</p>
            </div>
          ) : (
            <div className="relative bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 md:h-80 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Activity Indicator Overlay */}
              <div className="absolute top-4 right-4 bg-surface-container/80 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isUserActive ? 'bg-green-400' : 'bg-red-400'
                    } animate-pulse`}
                  />
                  <span className="text-xs font-medium">
                    {isUserActive ? 'Studying' : 'Away'}
                  </span>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-xs text-white mb-2">
                  <span>Detection</span>
                  <span>{Math.round(detectionConfidence)}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    style={{ width: `${detectionConfidence}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-7xl md:text-8xl font-bold text-primary font-mono mb-4">
            {formatTime(timeLeft)}
          </div>
          <p className="text-outline-variant text-lg">
            {isWorkPhase ? '⏱️ Work Time' : '☕ Break Time'}
          </p>
        </div>

        {/* Activity Warning */}
        {activityWarning && (
          <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-center">
            <p className="text-yellow-300 text-sm font-medium">{activityWarning}</p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Coins */}
          <div className="bg-surface-container rounded-lg p-4 text-center">
            <span className="material-symbols-outlined text-2xl text-primary mb-2 block">
              monetization_on
            </span>
            <p className="text-xs text-outline-variant mb-1">Coins</p>
            <p className="text-2xl font-bold text-primary">
              {Math.round(coinsEarned)}
            </p>
          </div>

          {/* Sessions */}
          <div className="bg-surface-container rounded-lg p-4 text-center">
            <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">
              check_circle
            </span>
            <p className="text-xs text-outline-variant mb-1">Sessions</p>
            <p className="text-2xl font-bold text-secondary">{sessionsCompleted}</p>
          </div>

          {/* Time */}
          <div className="bg-surface-container rounded-lg p-4 text-center">
            <span className="material-symbols-outlined text-2xl text-tertiary mb-2 block">
              schedule
            </span>
            <p className="text-xs text-outline-variant mb-1">Time</p>
            <p className="text-2xl font-bold text-tertiary">
              {Math.floor(totalSessionTime / 60)}m
            </p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mb-8">
          {!isRunning ? (
            <button
              onClick={handleStartSession}
              disabled={!cameraActive}
              className="flex-1 py-4 px-6 bg-primary text-on-primary rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <span className="material-symbols-outlined inline mr-2">play_arrow</span>
              Start Studying
            </button>
          ) : (
            <button
              onClick={handleStopSession}
              className="flex-1 py-4 px-6 bg-yellow-600 text-on-primary rounded-xl font-semibold hover:brightness-110 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined inline mr-2">pause</span>
              Pause
            </button>
          )}

          <button
            onClick={toggleBackgroundSound}
            className={`py-4 px-6 rounded-xl font-semibold transition-all active:scale-95 ${
              soundEnabled
                ? 'bg-secondary text-on-secondary hover:brightness-110'
                : 'bg-surface-container text-outline-variant'
            }`}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            <span className="material-symbols-outlined">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>

        {/* Sound Selection */}
        {soundEnabled && (
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-2">
            {['forest', 'coffee-shop', 'rain', 'ocean'].map((sound) => (
              <button
                key={sound}
                onClick={() => setCurrentSound(sound)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  currentSound === sound
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-outline-variant hover:bg-surface-container-high'
                }`}
              >
                {sound.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}

        {/* End Session Button */}
        <button
          onClick={handleEndSession}
          className="w-full py-4 px-6 bg-surface-container text-on-surface border border-outline-variant/30 rounded-xl font-semibold hover:bg-surface-container-high transition-all active:scale-95"
        >
          <span className="material-symbols-outlined inline mr-2">logout</span>
          End Session
        </button>

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-surface-container/50 rounded-lg border border-outline-variant/20">
          <h3 className="text-sm font-semibold text-on-surface mb-2">
            💡 Pro Tips for Maximum Coins:
          </h3>
          <ul className="text-xs text-outline-variant space-y-1">
            <li>✓ Face the camera during work sessions to earn coins</li>
            <li>✓ Complete multiple Pomodoro cycles for more rewards</li>
            <li>✓ Use background sounds to stay focused</li>
            <li>✓ Avoid distractions during work time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
