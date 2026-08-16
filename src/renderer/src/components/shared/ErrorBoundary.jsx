import React from 'react';

// ============================================================
// ErrorBoundary — shows the actual crash instead of a blank white screen
// ============================================================
// Wrap it around whatever's currently rendering (see body-detector.jsx).
// Pass a `key` that changes with the selection so it resets when you
// switch song/mode instead of staying stuck on a stale error.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-neutral-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-400">Something broke</h1>
          <pre className="max-h-[60vh] max-w-2xl overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-left text-xs text-red-200">
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Back
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
