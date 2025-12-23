import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
          <div className="max-w-md w-full bg-zinc-900 p-8 rounded-lg border border-zinc-800 shadow-2xl">
            <h1 className="text-2xl font-bold text-red-500 mb-4">System Malfunction</h1>
            <p className="text-gray-300 mb-6">
              Обнаружена критическая ошибка в работе интерфейса.
            </p>
            <div className="bg-black/50 p-4 rounded text-left overflow-auto max-h-40 mb-6 border border-zinc-800">
              <code className="text-xs text-red-400 font-mono">
                {this.state.error?.message || "Unknown Error"}
              </code>
            </div>
            <button
              className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
              onClick={() => {
                window.location.href = window.location.pathname;
              }}
            >
              Перезагрузить систему
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
