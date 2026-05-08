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

  // return (
  //   <div className="min-h-screen relative">
  //     {/* Background */}
  //     <div className="fixed inset-0 pointer-events-none overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]" />
  //       <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
  //       <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/8 rounded-full blur-3xl" />
  //       <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
  //       {/* Subtle grid */}
  //       <div className="absolute inset-0 opacity-[0.015]"
  //         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
  //     </div>

  //     <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
  //       {/* Header */}
  //       <header className="flex items-center justify-between mb-10 animate-fade-in">
  //         <div className="flex items-center gap-3">
  //           <span className="text-2xl">🌤️</span>
  //           <span className="font-display font-bold text-white text-xl tracking-tight">SkyCast</span>
  //         </div>
  //         <UnitToggle units={units} onToggle={toggleUnits} loading={loading} />
  //       </header>

  //       {/* Search */}
  //       <div className="mb-8 animate-slide-up">
  //         <SearchBar onSearch={search} onLocate={handleLocate} loading={loading} />
  //       </div>

  //       {/* Error */}
  //       {displayError && (
  //         <div className="mb-6">
  //           <ErrorBanner
  //             message={displayError}
  //             onDismiss={() => { /* errors auto-clear on next search */ }}
  //           />
  //         </div>
  //       )}

  //       {/* Content */}
  //       {loading && !weather && <SkeletonLoader />}
  //       {loading && weather && <LoadingSpinner />}

  //       {!loading && weather && (
  //         <div className="space-y-6">
  //           <CurrentWeather weather={weather} units={units} location={location} />
  //           <ForecastList forecast={forecast} units={units} />
  //         </div>
  //       )}

  //       {!loading && !weather && !displayError && (
  //         <WelcomeScreen onSearch={search} />
  //       )}
  //     </div>

  //     <Footer />
  //   </div>
  // );

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background (Stay as is) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]" />
        {/* ... existing blur circles ... */}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex-grow w-full">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌤️</span>
            <span className="font-display font-bold text-white text-xl">SkyCast</span>
          </div>
          <UnitToggle units={units} onToggle={toggleUnits} loading={loading} />
        </header>

        <div className="mb-8">
          <SearchBar onSearch={search} onLocate={handleLocate} loading={loading} />
        </div>

        {displayError && (
          <div className="mb-6">
            <ErrorBanner message={displayError} onDismiss={() => setLocError(null)} />
          </div>
        )}

        {/* This is where the weather logic happens */}
        <main>
          {loading && !weather && <SkeletonLoader />}
          {loading && weather && <LoadingSpinner />}
          {!loading && weather && (
            <div className="space-y-6">
              <CurrentWeather weather={weather} units={units} location={location} />
              <ForecastList forecast={forecast} units={units} />
            </div>
          )}
          {!loading && !weather && !displayError && (
            <WelcomeScreen onSearch={search} />
          )}
        </main>
      </div>

      {/* Footer is now part of the flex flow */}
      <Footer />
    </div>
  );
}
