import { useState, useRef } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';

export default function SearchBar({ onSearch, onLocate, loading }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [recents] = useState(() => JSON.parse(localStorage.getItem('recentSearches') || '[]'));
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleRecent = (r) => {
    setQuery(r);
    onSearch(r);
    setFocused(false);
  };

  const showDropdown = focused && recents.length > 0 && !query;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center rounded-2xl transition-all duration-300 ${focused ? 'glass-strong ring-1 ring-blue-400/40 shadow-lg shadow-blue-500/10' : 'glass'}`}>
          <Search size={18} className="absolute left-4 text-blue-400/70 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search city, ZIP code, or coordinates…"
            className="w-full bg-transparent py-4 pl-11 pr-24 font-body text-white placeholder-white/30 text-sm focus:outline-none"
            disabled={loading}
          />
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 rounded-xl text-white/40 hover:text-white/70 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={onLocate}
              title="Use my location"
              disabled={loading}
              className="p-2 rounded-xl text-blue-400/70 hover:text-blue-300 hover:bg-blue-400/10 transition-all"
            >
              <MapPin size={16} />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-display font-semibold tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              GO
            </button>
          </div>
        </div>
      </form>

      {/* Recent searches dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full glass-strong rounded-2xl overflow-hidden z-50 animate-scale-in shadow-xl shadow-black/30">
          <div className="px-4 py-2 border-b border-white/5">
            <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Recent</span>
          </div>
          {recents.map((r, i) => (
            <button
              key={i}
              onClick={() => handleRecent(r)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <Clock size={13} className="text-white/30 flex-shrink-0" />
              <span className="text-white/70 text-sm font-body">{r}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
