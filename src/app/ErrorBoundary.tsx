import React from 'react';

type State = { error: Error | null, info: React.ErrorInfo | null };

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="max-w-3xl w-full bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700">Application Error</h2>
            <p className="mt-2 text-sm text-red-600">An error occurred while rendering the application.</p>
            <pre className="mt-4 text-xs text-red-800 overflow-auto whitespace-pre-wrap">{this.state.error?.message}</pre>
            <details className="mt-4 text-xs text-red-700">
              <summary className="cursor-pointer">Stack trace</summary>
              <pre className="mt-2 text-xs text-red-800 overflow-auto whitespace-pre-wrap">{this.state.info?.componentStack}</pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

export default ErrorBoundary;
