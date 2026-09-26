import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { NeonButton } from './NeonButton';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
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
    console.error('[LSF_DEFENSE_ERROR_BOUNDARY] Uncaught runtime exception:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 rounded-md bg-[#190d0d] border border-secondary-neon/60 shadow-neon-orange flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-secondary-dark/60 flex items-center justify-center text-secondary-neon">
            <AlertTriangle size={24} />
          </div>

          <div className="space-y-1">
            <h3 className="font-headline font-semibold text-base text-white uppercase tracking-wider">
              {this.props.fallbackTitle || 'Tactical Module Malfunction'}
            </h3>
            <p className="text-xs text-tactical-muted max-w-md font-sans">
              {this.props.fallbackMessage ||
                'A subsystem rendered an invalid state. Fail-safe isolation protocol active.'}
            </p>
          </div>

          {this.state.error && (
            <div className="p-2 rounded bg-black/80 border border-white/10 font-mono text-[11px] text-secondary-neon max-w-lg overflow-x-auto">
              {this.state.error.message}
            </div>
          )}

          <NeonButton
            variant="secondary"
            size="sm"
            onClick={this.handleRetry}
            icon={<RefreshCw size={14} />}
          >
            Re-initialize Module
          </NeonButton>
        </div>
      );
    }

    return this.props.children;
  }
}
