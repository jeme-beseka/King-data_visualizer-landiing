import { Component } from 'react';

class ErrorBoundary extends Component {
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

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A] text-white p-6">
          <div className="text-center">
            <h1 className="text-3xl font-['Orbitron'] font-bold text-amber-400 mb-4">
              Something went wrong
            </h1>
            <p className="text-slate-400 mb-6">
              We apologize for the inconvenience. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0D0D1A] font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
