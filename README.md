# ClimaGraph - Weather Report Generator

A comprehensive React.js application for generating professional weather reports with interactive charts, PDF export functionality, and modern UI design.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions and forecasts for any location worldwide
- **Interactive Charts**: Beautiful visualizations using Recharts for temperature and humidity trends
- **PDF Export**: Download comprehensive weather reports as professional PDF documents
- **Map Integration**: Select locations using Google Maps API (simulated in demo)
- **Report History**: Save and manage your weather reports with localStorage
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Modern UI**: Built with TailwindCSS for a professional and clean interface

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ClimaGraph
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory to configure API keys:

```env
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key_here
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### API Keys Setup

1. **OpenWeatherMap API**:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key
   - Add it to your `.env` file

2. **Google Maps API** (Optional):
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create an API key
   - Add it to your `.env` file

**Note**: The application works with mock data if no API keys are provided, making it perfect for demo purposes.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   └── Footer.js       # Footer component
├── contexts/           # React Context providers
│   ├── ThemeContext.js # Theme management
│   └── WeatherContext.js # Weather data management
├── pages/              # Application pages
│   ├── Home.js         # Landing page
│   ├── WeatherReport.js # Weather report page
│   ├── History.js      # Saved reports page
│   ├── About.js        # About page
│   └── Contact.js      # Contact page
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and TailwindCSS
```

## 🛠️ Technologies Used

- **React.js** - UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Charting library for data visualization
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library

## 📱 Pages Overview

### Home Page
- Search bar for city names
- Google Maps integration for location selection
- Feature highlights and statistics
- Call-to-action sections

### Weather Report Page
- Current weather conditions
- Interactive temperature and humidity charts
- Detailed weather metrics
- PDF export functionality
- Save report option

### History Page
- View saved weather reports
- Refresh weather data for saved locations
- Delete old reports
- Statistics and analytics

### About Page
- Application information
- Technology stack details
- Mission and features
- Responsive design showcase

### Contact Page
- Contact form with validation
- Contact information
- FAQ section
- Business hours

## 🎨 Customization

### Themes
The application supports dark and light themes. Theme preferences are saved in localStorage and automatically applied on page load.

### Styling
All styles are built with TailwindCSS. You can customize the design by modifying the Tailwind configuration in `tailwind.config.js`.

### Colors
The primary color scheme can be customized in the Tailwind config:
- Primary: Blue shades
- Dark mode: Gray shades
- Accent: Purple gradients

## 📊 Data Management

### Weather Data
- Fetched from OpenWeatherMap API
- Cached in React Context
- Mock data available for demo purposes

### Report Storage
- Reports saved in browser localStorage
- Maximum 10 reports stored
- Automatic cleanup of old reports

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

## 🔒 Security Notes

- API keys should be kept secure and not committed to version control
- The application processes data client-side
- No sensitive data is stored on external servers
- All user data remains in the browser

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the FAQ section in the Contact page
2. Review the console for error messages
3. Ensure all dependencies are installed correctly
4. Verify API keys are properly configured

## 🔮 Future Enhancements

- User authentication with Firebase
- Weather alerts and notifications
- City comparison feature
- Weather news integration
- Advanced charting options
- Export to different formats (Excel, CSV)
- Weather widget for websites
- Mobile app version

---

**ClimaGraph** - Professional Weather Reports Made Simple 🌤️
