import React, { useState, useEffect } from "react";

const WeatherOverview = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [city, setCity] = useState("Phnom Penh"); // Default city, can be changed by user input
  const [units, setUnits] = useState("metric"); // Default units (metric or imperial)

  // OpenWeatherMap API key
  const API_KEY = "b93932bbe1df60eb75e5596059faf22e";

  // Fetch weather data when city or units change
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Include current weather, forecast, and air pollution data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error(
            `Failed to fetch weather data: ${weatherResponse.statusText}`
          );
        }

        const weatherResult = await weatherResponse.json();

        // Get coordinates for additional API calls
        const { lat, lon } = weatherResult.coord;

        // Fetch 5-day forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
          throw new Error(
            `Failed to fetch forecast data: ${forecastResponse.statusText}`
          );
        }

        const forecastResult = await forecastResponse.json();

        // Fetch air quality data
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const airQualityResponse = await fetch(airQualityUrl);

        if (!airQualityResponse.ok) {
          throw new Error(
            `Failed to fetch air quality data: ${airQualityResponse.statusText}`
          );
        }

        const airQualityResult = await airQualityResponse.json();

        // Combine all data
        const completeData = {
          current: weatherResult,
          forecast: forecastResult,
          airQuality: airQualityResult,
        };

        setWeatherData(completeData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, units, API_KEY]);

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle city input change
  const handleCityChange = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
    }
  };

  // Toggle between metric and imperial units
  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  // Format the current date and time
  const formatDateTime = () => {
    const today = currentTime;
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    return `Today, ${day} ${month}, ${hours}:${minutes}`;
  };

  // Get weather icon based on condition
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Format timestamp to day of week
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Get air quality description
  const getAirQualityDescription = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-lg text-gray-600">
          <svg
            className="animate-spin h-8 w-8 mx-auto mb-4 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-600 text-lg mb-2">Error: {error}</div>
        <p className="text-gray-700"></p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Try another city..."
            className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-orange-500"
            onKeyPress={handleCityChange}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600 transition-colors"
            onClick={() =>
              document.querySelector("input").value &&
              setCity(document.querySelector("input").value)
            }
          >
            Search
          </button>
        </div>
      </div>
    );
  }

  // Extract data from the API responses
  const { current, forecast, airQuality } = weatherData;

  const cityName = current.name;
  const countryCode = current.sys.country;
  const temperature = Math.round(current.main.temp);
  const weatherDescription = current.weather[0].description;
  const weatherIcon = current.weather[0].icon;
  const highTemp = Math.round(current.main.temp_max);
  const lowTemp = Math.round(current.main.temp_min);
  const feelsLike = Math.round(current.main.feels_like);
  const windSpeed =
    units === "metric"
      ? Math.round(current.wind.speed * 3.6) // Convert m/s to km/h
      : Math.round(current.wind.speed);
  const windUnit = units === "metric" ? "km/h" : "mph";
  const humidity = current.main.humidity;
  const pressure = current.main.pressure;
  const visibility = current.visibility / 1000; // Convert meters to kilometers
  const visibilityUnit = units === "metric" ? "km" : "mi";
  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const tempUnit = units === "metric" ? "°C" : "°F";

  // Air quality
  const aqi = airQuality.list[0].main.aqi;
  const airQualityText = getAirQualityDescription(aqi);

  // Daily forecast (taking one data point per day)
  const dailyForecasts = forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Weather Overview
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Input and Button */}
          <div className="relative w-full sm:w-auto group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search city..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-black text-sm sm:text-base placeholder-gray-400 hover:border-orange-400"
              onKeyPress={handleCityChange}
            />
            <button
              className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-1"
              onClick={() => {
                const inputValue = document.querySelector("input").value;
                if (inputValue) setCity(inputValue);
              }}
            >
              Search
            </button>
          </div>

          {/* Unit Toggle Button */}
          <button
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 text-sm sm:text-base"
            onClick={toggleUnits}
          >
            {units === "metric" ? "°C" : "°F"}
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-4 sm:p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-xl sm:text-2xl">
                {cityName}, {countryCode}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base">
                {formatDateTime()}
              </p>
            </div>
            <img
              src={getWeatherIcon(weatherIcon)}
              alt={weatherDescription}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>

          <div className="my-4 sm:my-6 text-center">
            <div className="flex items-center justify-center">
              <span className="text-5xl sm:text-7xl font-bold">
                {temperature}
                {tempUnit}
              </span>
            </div>
            <p className="text-lg sm:text-xl capitalize mt-2">
              {weatherDescription}
            </p>
            <p className="text-gray-300 mt-1 text-sm sm:text-base">
              Feels like {feelsLike}
              {tempUnit}
            </p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">High</p>
                  <p className="text-sm sm:text-base">
                    {highTemp}
                    {tempUnit}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Low</p>
                  <p className="text-sm sm:text-base">
                    {lowTemp}
                    {tempUnit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Sunrise</p>
                  <p className="text-sm sm:text-base">{sunrise}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Sunset</p>
                  <p className="text-sm sm:text-base">{sunset}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast and Details Section */}
        <div className="lg:col-span-2">
          {/* 5-Day Forecast */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {dailyForecasts.map((day, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-700 text-sm sm:text-base">
                    {formatDay(day.dt)}
                  </p>
                  <img
                    src={getWeatherIcon(day.weather[0].icon)}
                    alt={day.weather[0].description}
                    className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                  />
                  <p className="font-semibold text-sm sm:text-base">
                    {Math.round(day.main.temp)}
                    {tempUnit}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {day.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Air Quality</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {airQualityText}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Humidity</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {humidity}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Wind</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {windSpeed} {windUnit}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Pressure</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {pressure} hPa
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-yellow-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Visibility</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {visibility.toFixed(1)} {visibilityUnit}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div className="bg-red-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Feels Like</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {feelsLike}
                  {tempUnit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherOverview;
