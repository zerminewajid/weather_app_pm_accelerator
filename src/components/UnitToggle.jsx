export default function UnitToggle({ units, onToggle, loading }) {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      className="glass rounded-xl px-4 py-2 font-display font-semibold text-sm transition-all hover:bg-white/10 disabled:opacity-40"
      title="Toggle temperature units"
    >
      <span className={units === 'metric' ? 'text-blue-300' : 'text-white/30'}>°C</span>
      <span className="text-white/20 mx-1">/</span>
      <span className={units === 'imperial' ? 'text-blue-300' : 'text-white/30'}>°F</span>
    </button>
  );
}
