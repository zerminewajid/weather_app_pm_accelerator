import ForecastCard from './ForecastCard';

export default function ForecastList({ forecast, units }) {
  return (
    <div className="animate-slide-up animation-delay-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-white/90 text-lg">5-Day Forecast</h3>
        <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Daily Overview</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {forecast.map((day, i) => (
          <ForecastCard key={day.date} day={day} units={units} index={i} />
        ))}
      </div>
    </div>
  );
}
