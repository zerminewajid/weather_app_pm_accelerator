import { Droplets } from 'lucide-react';
import { getIconUrl } from '../services/weatherApi';
import { formatDay } from '../utils/helpers';

export default function ForecastCard({ day, units, index }) {
  const unitSymbol = units === 'metric' ? '°' : '°';
  const delayClass = ['', 'animation-delay-100', 'animation-delay-200', 'animation-delay-300', 'animation-delay-400'][index] || '';

  return (
    <div className={`glass rounded-2xl p-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:gap-2 hover:bg-white/10 transition-all duration-300 cursor-default animate-slide-up ${delayClass}`}>
      {/* Day label */}
      <div className="w-20 md:w-full md:text-center">
        <p className="font-display font-semibold text-white text-sm">{formatDay(day.date)}</p>
        <p className="text-white/30 text-xs font-mono hidden md:block">{new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
      </div>

      {/* Icon */}
      <img
        src={getIconUrl(day.icon, '2x')}
        alt={day.description}
        className="w-12 h-12 drop-shadow-lg flex-shrink-0"
      />

      {/* Precip */}
      {day.pop > 0 && (
        <div className="flex items-center gap-1 md:justify-center">
          <Droplets size={11} className="text-blue-400" />
          <span className="text-blue-300 text-xs font-mono">{day.pop}%</span>
        </div>
      )}

      {/* Temps */}
      <div className="text-right md:text-center flex md:flex-col items-center md:items-center gap-3 md:gap-0">
        <span className="font-display font-bold text-white text-base">{day.tempMax}{unitSymbol}</span>
        <span className="text-white/30 text-sm font-body">/</span>
        <span className="text-white/50 text-sm font-body">{day.tempMin}{unitSymbol}</span>
      </div>
    </div>
  );
}
