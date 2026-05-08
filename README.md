# 🌤️ SkyCast — Weather App

> AI Engineer Intern Technical Assessment (Frontend) · PM Accelerator


---

## Features

- **Smart Search** — city names, ZIP codes, GPS coordinates (lat,lon), or landmarks
- **Geolocation** — one-click weather for your current location
- **Current Weather** — temperature, feels-like, humidity, wind, visibility, pressure
- **5-Day Forecast** — daily high/low, precipitation probability, condition icons
- **Sun Schedule** — sunrise & sunset times
- **Packing Tips** — AI-style recommendations based on conditions
- **°C / °F Toggle** — switch units without a new API call
- **Recent Searches** — last 5 searches saved locally
- **Error Handling** — graceful messages for every failure case
- **Fully Responsive** — desktop, tablet, and mobile

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Framework & build tool |
| Tailwind CSS v3 | Utility-first styling & responsive design |
| Lucide React | Icon library |
| OpenWeatherMap API | Weather data |
| Browser Geolocation API | Current location detection |
| localStorage | Recent searches persistence |

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/weather-app-pm-accelerator.git
cd weather-app-pm-accelerator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API key
```bash
cp .env.example .env
```
Edit `.env` and replace `your_openweathermap_api_key_here` with your actual key.

Get a free key at [openweathermap.org](https://openweathermap.org/api) — free tier includes everything needed.

### 4. Start the dev server
```bash
npm run dev
```
Visit `http://localhost:5173`

### 5. Build for production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Smart search input with recent history
│   ├── CurrentWeather.jsx  # Main weather display card
│   ├── ForecastList.jsx    # 5-day forecast container
│   ├── ForecastCard.jsx    # Individual forecast day card
│   ├── ErrorBanner.jsx     # Error message display
│   ├── LoadingSpinner.jsx  # Animated loading state
│   ├── SkeletonLoader.jsx  # Skeleton UI while loading
│   ├── UnitToggle.jsx      # °C / °F switch button
│   ├── WelcomeScreen.jsx   # Landing state with quick searches
│   └── Footer.jsx          # Name, PM Accelerator info, links
├── services/
│   └── weatherApi.js       # All API calls & location resolution
├── hooks/
│   └── useWeather.js       # Custom hook for weather state
├── utils/
│   └── helpers.js          # Formatters, themes, packing tips
├── App.jsx
├── main.jsx
└── index.css
```

## slayed by

**[Zermine Wajid]** — AI Engineer Intern Assessment Submission
