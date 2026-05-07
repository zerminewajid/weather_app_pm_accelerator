import { AlertTriangle, X } from 'lucide-react';

export default function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="animate-scale-in w-full max-w-2xl mx-auto">
      <div className="glass rounded-2xl border border-red-500/20 bg-red-500/5 p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-red-300 text-sm font-semibold font-display mb-0.5">Something went wrong</p>
          <p className="text-red-300/70 text-sm font-body break-words">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400/50 hover:text-red-300 transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
