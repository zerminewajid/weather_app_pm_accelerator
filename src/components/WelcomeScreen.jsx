const SUGGESTIONS = ['New York, US', 'Tokyo, JP', 'London, GB', 'Dubai, AE', 'Sydney, AU'];

export default function WelcomeScreen({ onSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="text-7xl md:text-8xl animate-float inline-block">🌤️</div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            Sky<span className="gradient-text">Cast</span>
          </h1>
          <p className="text-white/40 font-body text-lg">Real-time weather for anywhere on Earth</p>
        </div>
      </div>

      {/* Tips */}
      <div className="glass rounded-2xl p-5 max-w-lg w-full">
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">You can search by</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['🏙️', 'City name', 'London, Paris, Tokyo'],
            ['📮', 'ZIP code', '10001, 90210'],
            ['📍', 'Coordinates', '40.71, -74.00'],
            ['🗺️', 'Landmark', 'Eiffel Tower, Times Sq'],
          ].map(([emoji, label, example]) => (
            <div key={label} className="flex items-start gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <span className="text-base flex-shrink-0 mt-0.5">{emoji}</span>
              <div>
                <p className="text-white/70 text-xs font-semibold font-display">{label}</p>
                <p className="text-white/30 text-xs font-mono">{example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick searches */}
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => onSearch(s)}
            className="glass rounded-full px-4 py-2 text-sm font-body text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
