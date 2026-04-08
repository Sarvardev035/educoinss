import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Decorative Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-6 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.2)]">
              <span className="material-symbols-outlined text-3xl text-primary fill-icon">monetization_on</span>
            </div>
            <h1 className="headline-font text-3xl font-bold tracking-tight text-on-surface">EduCoin 2.0</h1>
          </div>
          <h2 className="headline-font text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-outline-variant tracking-tighter">
            Turn discipline into currency
          </h2>
          <p className="font-body text-outline text-lg max-w-md mx-auto">
            Join the digital observatory where academic excellence meets the blockchain. Select your portal to begin.
          </p>
        </header>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Student Card */}
          <Link to="/student/dashboard" className="group relative role-card w-full text-left focus:outline-none transition-transform active:scale-[0.98]">
            <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-surface-container-low border border-outline-variant/15 rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-surface-container overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
                <span className="material-symbols-outlined text-9xl">school</span>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl text-primary fill-icon">school</span>
              </div>
              <h3 className="headline-font text-2xl font-bold text-on-surface mb-2">I'm a Student</h3>
              <p className="font-body text-outline-variant text-base mb-8">
                Earn coins, level up, unlock rewards
              </p>
              <div className="mt-auto w-full py-3 px-6 rounded-lg bg-primary/5 border border-primary/20 text-primary font-label text-sm uppercase tracking-widest group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                Enter Workspace
              </div>
              <div className="card-glow absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
            </div>
          </Link>

          {/* Parent Card */}
          <Link to="/parent/dashboard" className="group relative role-card w-full text-left focus:outline-none transition-transform active:scale-[0.98]">
            <div className="absolute -inset-0.5 bg-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-surface-container-low border border-outline-variant/15 rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:border-secondary/50 group-hover:bg-surface-container overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
                <span className="material-symbols-outlined text-9xl">family_restroom</span>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl text-secondary fill-icon">family_restroom</span>
              </div>
              <h3 className="headline-font text-2xl font-bold text-on-surface mb-2">I'm a Parent</h3>
              <p className="font-body text-outline-variant text-base mb-8">
                Monitor, guide, and reward your child
              </p>
              <div className="mt-auto w-full py-3 px-6 rounded-lg bg-secondary/5 border border-secondary/20 text-secondary font-label text-sm uppercase tracking-widest group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300">
                Launch Command Center
              </div>
              <div className="card-glow absolute inset-0 pointer-events-none bg-gradient-to-br from-secondary/5 via-transparent to-transparent"></div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 px-6 py-2 rounded-full bg-surface-container border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline">Network Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-body text-xs font-medium text-secondary">Mainnet Operational</span>
            </div>
            <div className="w-px h-4 bg-outline-variant/20 mx-1"></div>
            <span className="font-body text-xs text-outline">v2.0.4-stable</span>
          </div>
          <div className="flex gap-8">
            <Link to="#" className="text-outline hover:text-on-surface font-body text-sm transition-colors">Privacy Protocol</Link>
            <Link to="#" className="text-outline hover:text-on-surface font-body text-sm transition-colors">Governance Docs</Link>
            <Link to="#" className="text-outline hover:text-on-surface font-body text-sm transition-colors">Support</Link>
          </div>
        </footer>
      </main>

      {/* Bottom border */}
      <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none opacity-30">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
      </div>
    </div>
  );
};

export default RoleSelection;
