const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org';

function handleError(data) {
  if (data.cod && String(data.cod) !== '200') {
    const msg = data.message || 'Unknown error';
    if (String(data.cod) === '404') throw new Error(`Location not found: "${msg}". Please check the spelling and try again.`);
    if (String(data.cod) === '401') throw new Error('Invalid API key. Please check your configuration.');
    if (String(data.cod) === '429') throw new Error('Too many requests. Please wait a moment and try again.');
    throw new Error(`API Error: ${msg}`);
  }
}

async function apiFetch(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    handleError(data);
    return data;
  } catch (err) {
    if (err.message.includes('fetch') || err.name === 'TypeError') {
      throw new Error('Unable to connect. Please check your internet connection.');
    }
    throw err;
  }
}

// Detect input type and resolve to { lat, lon, name }
export async function resolveLocation(query) {
  const trimmed = query.trim();

  // GPS coordinates: "40.71,-74.00" or "40.71 -74.00"
  const coordMatch = trimmed.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lon = parseFloat(coordMatch[2]);
    const data = await apiFetch(`${BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    if (!data.length) throw new Error('No location found at those coordinates.');
    return { lat, lon, name: `${data[0].name}, ${data[0].country}` };
  }

  // ZIP code: all digits, optionally with country "10001,US"
  const zipMatch = trimmed.match(/^(\d{4,10})(,\s*([A-Z]{2}))?$/i);
  if (zipMatch) {
    const country = zipMatch[3] || 'US';
    const data = await apiFetch(`${BASE}/geo/1.0/zip?zip=${zipMatch[1]},${country}&appid=${API_KEY}`);
    return { lat: data.lat, lon: data.lon, name: `${data.name}, ${data.country}` };
  }

  // City name or landmark
  const data = await apiFetch(`${BASE}/geo/1.0/direct?q=${encodeURIComponent(trimmed)}&limit=1&appid=${API_KEY}`);
  if (!data.length) throw new Error(`No location found for "${trimmed}". Try a different city name or ZIP code.`);
  const loc = data[0];
  const name = loc.state ? `${loc.name}, ${loc.state}, ${loc.country}` : `${loc.name}, ${loc.country}`;
  return { lat: loc.lat, lon: loc.lon, name };
}

export async function fetchCurrentWeather(lat, lon, units = 'metric') {
  return apiFetch(`${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
}

export async function fetchForecast(lat, lon, units = 'metric') {
  const data = await apiFetch(`${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=40&appid=${API_KEY}`);

  // Group 3-hour intervals into daily summaries
  const days = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  return Object.entries(days).slice(0, 5).map(([date, items]) => {
    const temps = items.map(i => i.main.temp);
    const midday = items.find(i => i.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];
    return {
      date,
      tempMin: Math.round(Math.min(...temps)),
      tempMax: Math.round(Math.max(...temps)),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      humidity: midday.main.humidity,
      pop: Math.round((midday.pop || 0) * 100),
    };
  });
}

export async function fetchByCoordinates(lat, lon, units = 'metric') {
  return fetchCurrentWeather(lat, lon, units);
}

export function getIconUrl(icon, size = '2x') {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}
