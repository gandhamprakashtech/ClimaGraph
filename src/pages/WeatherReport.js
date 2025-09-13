import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { 
  ArrowLeft, 
  Download, 
  Save, 
  RefreshCw, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sunrise, 
  Sunset,
  Gauge,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

const WeatherReport = () => {
  const { weatherData, loading, error, saveReport } = useWeather();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!weatherData && !loading && !error) {
      navigate('/');
    }
  }, [weatherData, loading, error, navigate]);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': Sun,
      'Clouds': Cloud,
      'Rain': CloudRain,
      'Snow': Snowflake,
      'Thunderstorm': Zap,
      'Mist': Cloud,
      'Fog': Cloud,
    };
    return iconMap[condition] || Cloud;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSaveReport = () => {
    if (weatherData) {
      saveReport(weatherData);
      toast.success('Report saved to history!');
    }
  };

  const handleDownloadPDF = async () => {
    if (!weatherData) return;

    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('weather-report-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `weather-report-${weatherData.city}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const prepareChartData = () => {
    if (!weatherData?.forecast?.list) return [];

    return weatherData.forecast.list.slice(0, 8).map((item, index) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Weather Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const current = weatherData.current;
  const chartData = prepareChartData();
  const WeatherIcon = getWeatherIcon(current.weather[0].main);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Weather Report
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {weatherData.city}, {weatherData.country} • {formatDate(current.dt)}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSaveReport}
              className="btn-secondary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="btn-primary flex items-center space-x-2"
            >
              {isGeneratingPDF ? (
                <div className="loading-spinner h-4 w-4" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Weather Report Content */}
        <div id="weather-report-content" className="space-y-8">
          {/* Current Weather Card */}
          <div className="weather-card">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="text-6xl">
                  <WeatherIcon className="h-16 w-16 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {Math.round(current.main.temp)}°C
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">
                    {current.weather[0].description}
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Feels like {Math.round(current.main.feels_like)}°C
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
                <div className="metric-card">
                  <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {current.main.humidity}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Humidity</div>
                </div>
                
                <div className="metric-card">
                  <Wind className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {current.wind.speed} m/s
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</div>
                </div>
                
                <div className="metric-card">
                  <Gauge className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {current.main.pressure} hPa
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Pressure</div>
                </div>
                
                <div className="metric-card">
                  <Eye className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(current.visibility / 1000)} km
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Visibility</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sunrise/Sunset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Sunrise className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sunrise
                </h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(current.sys.sunrise)}
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Sunset className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sunset
                </h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(current.sys.sunset)}
              </p>
            </div>
          </div>

          {/* Temperature Chart */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              8-Hour Temperature Forecast
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value}°C`, name]}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: '#f9fafb', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Humidity Forecast
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: '#f9fafb', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="humidity" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Details */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Wind Direction
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {current.wind.deg}° ({getWindDirection(current.wind.deg)})
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Cloudiness
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {current.clouds?.all || 0}%
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  UV Index
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {current.uvi || 'N/A'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Coordinates
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {current.coord.lat.toFixed(4)}, {current.coord.lon.toFixed(4)}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Last Updated
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(current.dt * 1000).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get wind direction
const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export default WeatherReport;
