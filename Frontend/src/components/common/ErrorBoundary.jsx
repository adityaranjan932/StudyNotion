import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-richblack-5 mb-4">
              Something went wrong
            </h2>
            <p className="text-richblack-200 mb-4">
              We're sorry, but there was an error loading this section.
            </p>
            <button
              className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md hover:bg-yellow-100 transition-colors"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
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
