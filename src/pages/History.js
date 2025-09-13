import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { 
  Trash2, 
  RefreshCw, 
  Download, 
  Calendar, 
  MapPin, 
  Thermometer,
  Cloud,
  Eye,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const History = () => {
  const { savedReports, deleteReport, fetchWeatherData } = useWeather();
  const [refreshingId, setRefreshingId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteReport(id);
      toast.success('Report deleted successfully');
    }
  };

  const handleRefresh = async (report) => {
    setRefreshingId(report.id);
    try {
      await fetchWeatherData(report.city, report.coordinates);
      toast.success('Weather data refreshed!');
    } catch (error) {
      toast.error('Failed to refresh weather data');
    } finally {
      setRefreshingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Mist': '🌫️',
      'Fog': '🌫️',
    };
    return iconMap[condition] || '🌤️';
  };

  if (savedReports.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Saved Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your saved weather reports will appear here.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary"
          >
            Generate Your First Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Weather Report History
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your saved weather reports
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedReports.map((report) => (
            <div key={report.id} className="card hover:shadow-xl transition-shadow duration-300">
              {/* Report Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {getWeatherIcon(report.current.weather[0].main)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {report.city}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {report.country}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleRefresh(report)}
                    disabled={refreshingId === report.id}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    title="Refresh weather data"
                  >
                    {refreshingId === report.id ? (
                      <div className="loading-spinner h-4 w-4" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    title="Delete report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Weather Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Temperature</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.round(report.current.main.temp)}°C
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Condition</span>
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white capitalize">
                    {report.current.weather[0].description}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Humidity</span>
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {report.current.main.humidity}%
                  </span>
                </div>
              </div>

              {/* Location and Date */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Saved {formatDate(report.savedAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    // Navigate to weather report page with this data
                    window.location.href = '/weather';
                  }}
                  className="flex-1 btn-primary text-sm py-2"
                >
                  View Report
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would download the PDF
                    toast.success('PDF download started');
                  }}
                  className="btn-secondary text-sm py-2 px-3"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {savedReports.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Reports
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {new Set(savedReports.map(r => r.city)).size}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Unique Cities
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {savedReports.length > 0 ? 
                Math.round((Date.now() - new Date(savedReports[0].savedAt).getTime()) / (1000 * 60 * 60 * 24)) : 0
              }
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Days Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
