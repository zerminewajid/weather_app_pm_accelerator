import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import ErrorBanner from './components/ErrorBanner';
import LoadingSpinner from './components/LoadingSpinner';
import SkeletonLoader from './components/SkeletonLoader';
import UnitToggle from './components/UnitToggle';
import WelcomeScreen from './components/WelcomeScreen';
import Footer from './components/Footer';

export default function App() {
  const { weather, forecast, location, loading, error, units, search, searchByCoords, toggleUnits } = useWeather();
  const [locError, setLocError] = useState(null);

  const handleLocate = useCallback(() => {
    setLocError(null);
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        if (err.code === 1) setLocError('Location access denied. Please search for a city manually.');
        else if (err.code === 2) setLocError('Could not determine your location. Try searching manually.');
        else if (err.code === 3) setLocError('Location request timed out. Please try again.');
        else setLocError('Unable to get your location.');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, [searchByCoords]);

  const displayError = error || locError;

  return (
    <div className="min-h-screen flex flex-col relative"> {/* Added flex and flex-col */}
    
      {/* ... Keep your Background and Header/Search/Content as they are ... */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex-grow"> {/* Added flex-grow */}
        {/* ... All your header, search, and weather content ... */}
      </div>

      <Footer /> {/* Footer stays here, but the parent now handles it better */}
    </div>
);
}
