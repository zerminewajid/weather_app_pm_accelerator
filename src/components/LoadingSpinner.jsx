export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in">
      {/* Layered animated rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-300/60 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-4 rounded-full bg-blue-400/10 animate-pulse" />
      </div>
      <div className="text-center">
        <p className="text-white/60 text-sm font-body">Fetching weather data</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-blue-400/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
