import { useState, useCallback } from 'react';
import { resolveLocation, fetchCurrentWeather, fetchForecast } from '../services/weatherApi';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric');

  const search = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const loc = await resolveLocation(query);
      const [w, f] = await Promise.all([
        fetchCurrentWeather(loc.lat, loc.lon, units),
        fetchForecast(loc.lat, loc.lon, units),
      ]);
      setLocation(loc);
      setWeather(w);
      setForecast(f);
      // Save to recent searches
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const updated = [loc.name, ...recent.filter(r => r !== loc.name)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const searchByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [w, f] = await Promise.all([
        fetchCurrentWeather(lat, lon, units),
        fetchForecast(lat, lon, units),
      ]);
      const locName = `${w.name}, ${w.sys.country}`;
      setLocation({ lat, lon, name: locName });
      setWeather(w);
      setForecast(f);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const toggleUnits = useCallback(async () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    if (location) {
      setLoading(true);
      try {
        const [w, f] = await Promise.all([
          fetchCurrentWeather(location.lat, location.lon, newUnits),
          fetchForecast(location.lat, location.lon, newUnits),
        ]);
        setWeather(w);
        setForecast(f);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [units, location]);

  return { weather, forecast, location, loading, error, units, search, searchByCoords, toggleUnits };
}
