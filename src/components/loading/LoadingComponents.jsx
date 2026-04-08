import React from 'react';

/**
 * Loading component with spinner and optional text
 */
export function Spinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-b-2',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-primary`} />
      {text && <p className="text-sm text-outline">{text}</p>}
    </div>
  );
}

/**
 * Full-screen loading page
 */
export function LoadingPage({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <Spinner size="lg" text={message} />
    </div>
  );
}

/**
 * Page skeleton loader (placeholder content while loading)
 */
export function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Title skeleton */}
      <div className="h-10 bg-surface-container rounded-lg w-1/3" />
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-surface-container rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default Spinner;
