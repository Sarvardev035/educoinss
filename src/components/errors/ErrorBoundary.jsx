import React from 'react';

/**
 * Error Boundary - Catches and displays errors gracefully
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-surface px-4">
          <div className="max-w-md text-center">
            <div className="mb-6">
              <span className="material-symbols-outlined text-6xl text-red-400 mb-4 block">
                error_outline
              </span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">Oops! Something went wrong</h1>
            <p className="text-outline-variant mb-6">
              We encountered an error while loading this page. Please try refreshing or going back.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left bg-surface-container rounded-lg p-4 text-xs text-outline-variant">
                <summary className="cursor-pointer font-semibold mb-2">Error details</summary>
                <code className="whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </code>
              </details>
            )}
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:brightness-110 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold hover:bg-surface-container-high transition-all"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
