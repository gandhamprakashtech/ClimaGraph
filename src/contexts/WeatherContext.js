import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
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
    const saved = localStorage.getItem("weatherReports");
    if (saved) {
      try {
        setSavedReports(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading saved reports:", err);
      }
    }
  }, []);

  // Save reports to localStorage whenever savedReports changes
  useEffect(() => {
    localStorage.setItem("weatherReports", JSON.stringify(savedReports));
  }, [savedReports]);

  const saveReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    };
    setSavedReports((prev) => [newReport, ...prev.slice(0, 9)]); // Keep only last 10 reports
  };

  const deleteReport = (id) => {
    setSavedReports((prev) => prev.filter((report) => report.id !== id));
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    const API_KEY = "120d6d0495ea56aa648525ee4d837008";

    try {
      if (!city || !city.trim()) {
        throw new Error("Please enter a city name");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      const data = await response.json();

      if (data.cod === "404") {
        throw new Error("City not found");
      }

      if (data.cod !== 200) {
        throw new Error("Failed to fetch weather data");
      }

      // Get forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        current: data,
        forecast: forecastData,
        coordinates: {
          lat: data.coord.lat,
          lng: data.coord.lon
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Weather fetch failed:", err);
      setError(err.message);
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
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
