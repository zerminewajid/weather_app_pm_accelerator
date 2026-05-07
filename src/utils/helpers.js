export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatDay(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatTime(unixTimestamp) {
  return new Date(unixTimestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

export function getWeatherTheme(weatherId, isDay = true) {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) return {
    gradient: 'from-slate-900 via-purple-950 to-slate-900',
    accent: '#a78bfa',
    emoji: '⛈️',
    label: 'Stormy'
  };
  // Drizzle / Rain
  if (weatherId >= 300 && weatherId < 600) return {
    gradient: 'from-slate-800 via-blue-950 to-slate-900',
    accent: '#93c5fd',
    emoji: '🌧️',
    label: 'Rainy'
  };
  // Snow
  if (weatherId >= 600 && weatherId < 700) return {
    gradient: 'from-slate-700 via-blue-900 to-slate-800',
    accent: '#e0f2fe',
    emoji: '❄️',
    label: 'Snowy'
  };
  // Atmosphere (fog, mist, haze)
  if (weatherId >= 700 && weatherId < 800) return {
    gradient: 'from-gray-800 via-gray-700 to-slate-800',
    accent: '#d1d5db',
    emoji: '🌫️',
    label: 'Foggy'
  };
  // Clear
  if (weatherId === 800) return isDay ? {
    gradient: 'from-blue-900 via-sky-900 to-indigo-950',
    accent: '#fbbf24',
    emoji: '☀️',
    label: 'Clear'
  } : {
    gradient: 'from-indigo-950 via-slate-900 to-blue-950',
    accent: '#c4b5fd',
    emoji: '🌙',
    label: 'Clear Night'
  };
  // Clouds
  return {
    gradient: 'from-slate-800 via-slate-700 to-blue-950',
    accent: '#94a3b8',
    emoji: '⛅',
    label: 'Cloudy'
  };
}

export function getPackingTips(weather, forecast) {
  const tips = [];
  const temp = weather.main.temp;
  const feels = weather.main.feels_like;
  const windSpeed = weather.wind.speed;
  const humidity = weather.main.humidity;
  const rain = forecast.some(d => d.pop > 50);
  const uvi = weather.uvi || 0;

  if (feels < 5) tips.push({ icon: '🧥', text: 'Heavy coat essential — feels freezing outside' });
  else if (feels < 15) tips.push({ icon: '🧣', text: 'Bring a jacket and layers' });
  else if (feels > 30) tips.push({ icon: '🩴', text: 'Light, breathable clothing recommended' });

  if (rain) tips.push({ icon: '☂️', text: 'Rain expected — pack an umbrella' });
  if (uvi > 6) tips.push({ icon: '🕶️', text: 'High UV index — wear sunscreen & sunglasses' });
  if (windSpeed > 10) tips.push({ icon: '💨', text: 'Strong winds — secure loose items' });
  if (humidity > 80) tips.push({ icon: '💧', text: 'High humidity — stay hydrated' });

  return tips.slice(0, 3);
}

export function celsiusToFahrenheit(c) { return Math.round((c * 9/5) + 32); }
export function fahrenheitToCelsius(f) { return Math.round((f - 32) * 5/9); }

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}
