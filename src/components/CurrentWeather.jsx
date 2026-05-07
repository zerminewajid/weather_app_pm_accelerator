import { Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, Gauge } from 'lucide-react';
import { getIconUrl } from "../services/weatherApi";
import { getWeatherTheme, formatTime, getWindDirection, getPackingTips } from '../utils/helpers';


function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-2 animate-slide-up">
      <div className="flex items-center gap-2">
        <Icon size={14} style={{ color: accent }} className="opacity-80" />
        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-lg font-display font-semibold text-white">{value}</span>
    </div>
  );
}

export default function CurrentWeather({ weather, units, location }) {
  const isDay = weather.weather[0].icon.endsWith('d');
  const theme = getWeatherTheme(weather.weather[0].id, isDay);
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';
  const tips = getPackingTips(weather, []);

  return (
    <div className="animate-scale-in">
      {/* Main card */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${theme.gradient} p-8 mb-4 shadow-2xl`}>
        {/* Decorative orb */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.accent}, transparent)` }}
        />

        <div className="relative z-10">
          {/* Location */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-1">Current Weather</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">{location?.name || weather.name}</h2>
              <p className="text-white/50 text-sm mt-1 font-body capitalize">{weather.weather[0].description}</p>
            </div>
            <div className="text-right">
              <span className="text-white/30 text-xs font-mono">Updated</span>
              <p className="text-white/60 text-sm font-mono">{new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</p>
            </div>
          </div>

          {/* Temperature + Icon */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-end gap-2">
                <span className="font-display text-7xl md:text-8xl font-bold text-white leading-none">
                  {Math.round(weather.main.temp)}
                </span>
                <span className="font-display text-3xl text-white/60 mb-3">{unitSymbol}</span>
              </div>
              <p className="text-white/50 text-sm font-body mt-1">
                Feels like <span className="text-white/80">{Math.round(weather.main.feels_like)}{unitSymbol}</span>
                &nbsp;·&nbsp; H:{Math.round(weather.main.temp_max)}{unitSymbol} L:{Math.round(weather.main.temp_min)}{unitSymbol}
              </p>
            </div>
            <div className="animate-float">
              <img
                src={getIconUrl(weather.weather[0].icon, '4x')}
                alt={weather.weather[0].description}
                className="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard icon={Droplets} label="Humidity" value={`${weather.main.humidity}%`} accent={theme.accent} />
        <StatCard icon={Wind} label="Wind" value={`${weather.wind.speed} ${speedUnit} ${getWindDirection(weather.wind.deg)}`} accent={theme.accent} />
        <StatCard icon={Eye} label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} accent={theme.accent} />
        <StatCard icon={Gauge} label="Pressure" value={`${weather.main.pressure} hPa`} accent={theme.accent} />
      </div>

      {/* Sunrise/Sunset + Packing tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Sun times */}
        <div className="glass rounded-2xl p-4 animate-slide-up animation-delay-200">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Sun Schedule</p>
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-3">
              <Sunrise size={20} className="text-orange-400" />
              <div>
                <p className="text-white/40 text-xs">Sunrise</p>
                <p className="font-display text-white font-semibold">{formatTime(weather.sys.sunrise)}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <Sunset size={20} className="text-orange-300" />
              <div>
                <p className="text-white/40 text-xs">Sunset</p>
                <p className="font-display text-white font-semibold">{formatTime(weather.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Packing tips */}
        {tips.length > 0 && (
          <div className="glass rounded-2xl p-4 animate-slide-up animation-delay-300">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Pack This</p>
            <div className="space-y-2">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{tip.icon}</span>
                  <span className="text-white/70 text-sm font-body">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
