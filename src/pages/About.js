import React from 'react';
import { 
  Cloud, 
  BarChart3, 
  Download, 
  MapPin, 
  Zap, 
  Shield, 
  Globe, 
  Code,
  Database,
  Smartphone,
  Monitor
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Cloud,
      title: 'Real-time Weather Data',
      description: 'Access current weather conditions and accurate forecasts from reliable weather APIs.',
    },
    {
      icon: BarChart3,
      title: 'Interactive Visualizations',
      description: 'Beautiful charts and graphs to visualize weather trends and patterns.',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Generate professional weather reports in PDF format for easy sharing.',
    },
    {
      icon: MapPin,
      title: 'Global Coverage',
      description: 'Weather data for any location worldwide with precise coordinates.',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed with efficient data loading and rendering.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely and never stored on our servers.',
    },
  ];

  const technologies = [
    { name: 'React.js', description: 'Modern UI library for building interactive interfaces' },
    { name: 'TailwindCSS', description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Recharts', description: 'Composable charting library for data visualization' },
    { name: 'OpenWeatherMap API', description: 'Reliable weather data provider with global coverage' },
    { name: 'Google Maps API', description: 'Interactive maps for location selection' },
    { name: 'jsPDF', description: 'Client-side PDF generation for report exports' },
    { name: 'React Router', description: 'Declarative routing for single-page applications' },
    { name: 'React Hot Toast', description: 'Beautiful notification system for user feedback' },
  ];

  const stats = [
    { number: '10K+', label: 'Weather Reports Generated' },
    { number: '195+', label: 'Countries Supported' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Data Updates' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
              <Cloud className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About ClimaGraph
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ClimaGraph is a professional weather report generator that combines real-time weather data 
            with beautiful visualizations to create comprehensive weather reports for any location worldwide.
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card hover:shadow-xl transition-shadow duration-300 group">
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
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We believe that weather information should be accessible, accurate, and beautifully presented. 
                ClimaGraph democratizes weather reporting by providing professional-grade tools that anyone can use 
                to create comprehensive weather reports. Whether you're a meteorologist, researcher, or simply 
                someone who loves weather data, ClimaGraph empowers you to turn raw weather data into 
                meaningful insights.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Design */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Responsive Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <Smartphone className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mobile First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for mobile devices with touch-friendly interfaces and responsive layouts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <Monitor className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Desktop Optimized
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full-featured experience on desktop with advanced charting and data visualization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <Globe className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cross-Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works seamlessly across all devices and operating systems with consistent performance.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Data Sources & Reliability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  OpenWeatherMap API
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use OpenWeatherMap's reliable weather API to provide accurate, real-time weather data 
                for locations worldwide. The API is updated every 10 minutes and covers over 200,000 cities.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Current weather conditions</li>
                <li>• 5-day weather forecast</li>
                <li>• Historical weather data</li>
                <li>• Weather alerts and warnings</li>
              </ul>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Data Accuracy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our weather data is sourced from meteorological stations, satellites, and weather models 
                to ensure the highest accuracy possible. Data is validated and quality-checked before display.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 99.9% uptime guarantee</li>
                <li>• Real-time data updates</li>
                <li>• Quality assurance protocols</li>
                <li>• Multiple data source validation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start generating professional weather reports today. 
              No signup required, completely free to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Generate Weather Report
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
