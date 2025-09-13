import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedReports, setSavedReports] = useState([]);

  // Load saved reports from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('weatherReports');
    if (saved) {
      try {
        setSavedReports(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading saved reports:', err);
      }
    }
  }, []);

  // Save reports to localStorage whenever savedReports changes
  useEffect(() => {
    localStorage.setItem('weatherReports', JSON.stringify(savedReports));
  }, [savedReports]);

  const saveReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    };
    setSavedReports(prev => [newReport, ...prev.slice(0, 9)]); // Keep only last 10 reports
  };

  const deleteReport = (id) => {
    setSavedReports(prev => prev.filter(report => report.id !== id));
  };

  const fetchWeatherData = async (city, coordinates = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use mock data if no API key is provided
      const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
      
      if (!API_KEY) {
        // Return mock data for demo
        const mockData = generateMockWeatherData(city, coordinates);
        setWeatherData(mockData);
        setLoading(false);
        return;
      }

      let url;
      if (coordinates) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${API_KEY}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather data not found for ${city}`);
      }

      const data = await response.json();
      
      // Fetch 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      const weatherInfo = {
        current: data,
        forecast: forecastData,
        city: data.name,
        country: data.sys.country,
        coordinates: data.coord,
        timestamp: new Date().toISOString(),
      };

      setWeatherData(weatherInfo);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    weatherData,
    loading,
    error,
    savedReports,
    fetchWeatherData,
    saveReport,
    deleteReport,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Mock data generator for demo purposes
const generateMockWeatherData = (city, coordinates) => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Mist'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const baseTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C
  
  return {
    current: {
      dt: Math.floor(Date.now() / 1000), // Current timestamp
      main: {
        temp: baseTemp,
        feels_like: baseTemp + Math.floor(Math.random() * 4) - 2,
        humidity: Math.floor(Math.random() * 40) + 40,
        pressure: Math.floor(Math.random() * 100) + 1000,
      },
      weather: [{
        main: randomCondition,
        description: randomCondition.toLowerCase(),
        icon: '01d'
      }],
      wind: {
        speed: Math.floor(Math.random() * 15) + 1,
        deg: Math.floor(Math.random() * 360)
      },
      visibility: Math.floor(Math.random() * 5000) + 5000,
      clouds: {
        all: Math.floor(Math.random() * 100)
      },
      sys: {
        sunrise: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 3600),
        sunset: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 3600) + 43200,
        country: 'US'
      },
      coord: coordinates || { lat: 40.7128, lng: -74.0060 }
    },
    forecast: {
      list: Array.from({ length: 40 }, (_, i) => ({
        dt: Math.floor(Date.now() / 1000) + (i * 3 * 60 * 60), // Unix timestamp
        main: {
          temp: baseTemp + Math.floor(Math.random() * 10) - 5,
          humidity: Math.floor(Math.random() * 40) + 40,
        },
        weather: [{
          main: conditions[Math.floor(Math.random() * conditions.length)],
          description: 'partly cloudy',
          icon: '02d'
        }]
      }))
    },
    city: city || 'New York',
    country: 'US',
    coordinates: coordinates || { lat: 40.7128, lng: -74.0060 },
    timestamp: new Date().toISOString(),
  };
};
