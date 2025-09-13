import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { Search, MapPin, Cloud, BarChart3, Download, History, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [city, setCity] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const { fetchWeatherData, loading } = useWeather();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error('Please enter a city name');
      return;
    }

    try {
      await fetchWeatherData(city);
      navigate('/weather');
      toast.success(`Weather data loaded for ${city}`);
    } catch (error) {
      toast.error('Failed to fetch weather data');
    }
  };

  const handleMapSelection = (coordinates) => {
    setShowMapModal(false);
    fetchWeatherData(null, coordinates);
    navigate('/weather');
    toast.success('Weather data loaded for selected location');
  };

  const features = [
    {
      icon: Cloud,
      title: 'Real-time Weather',
      description: 'Get current weather conditions and forecasts for any location worldwide.',
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Visualize weather trends with beautiful charts and graphs.',
    },
    {
      icon: Download,
      title: 'PDF Reports',
      description: 'Download comprehensive weather reports in PDF format.',
    },
    {
      icon: History,
      title: 'Report History',
      description: 'Save and access your previous weather reports anytime.',
    },
    {
      icon: MapPin,
      title: 'Map Integration',
      description: 'Select locations directly from Google Maps for precise weather data.',
    },
    {
      icon: Zap,
      title: 'Fast & Accurate',
      description: 'Powered by reliable weather APIs for accurate and up-to-date information.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Weather Reports
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Generate comprehensive weather reports with interactive charts, 
              detailed analytics, and professional PDF exports for any location worldwide.
            </p>

            {/* Search Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name (e.g., New York, London, Tokyo)"
                    className="input-field pl-12 text-lg py-4"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="loading-spinner h-5 w-5" />
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Get Weather</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <span className="text-gray-500 dark:text-gray-400">or</span>
                <button
                  onClick={() => setShowMapModal(true)}
                  className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Select on Google Maps
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  10K+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Weather Reports Generated
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  195+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Countries Supported
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create professional weather reports and analyze weather data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start generating professional weather reports in minutes. 
            No signup required, completely free to use.
          </p>
          <button
            onClick={() => navigate('/weather')}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Try It Now
          </button>
        </div>
      </section>

      {/* Map Modal */}
      {showMapModal && (
        <MapSelectionModal
          onClose={() => setShowMapModal(false)}
          onSelect={handleMapSelection}
        />
      )}
    </div>
  );
};

// Map Selection Modal Component
const MapSelectionModal = ({ onClose, onSelect }) => {
  const [coordinates, setCoordinates] = useState(null);

  const handleMapClick = (e) => {
    // Mock coordinates for demo - in real app, integrate with Google Maps API
    const mockCoords = {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.0060 + (Math.random() - 0.5) * 0.1,
    };
    setCoordinates(mockCoords);
  };

  const handleConfirm = () => {
    if (coordinates) {
      onSelect(coordinates);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Select Location on Map
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Google Maps Integration
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Click anywhere on the map to select location
              </p>
              <button
                onClick={handleMapClick}
                className="mt-4 btn-primary"
              >
                Simulate Map Click
              </button>
            </div>
          </div>
          
          {coordinates && (
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mb-4">
              <p className="text-green-800 dark:text-green-200">
                Selected: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!coordinates}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
