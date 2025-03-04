import React, { useState, useEffect } from "react";

const Hero = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "b93932bbe1df60eb75e5596059faf22e"; // Replace with your API key
  const CITY = "Phnom Penh";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Format date to "Today, DD Mon" format
  const formatDate = () => {
    const date = new Date();
    const options = { day: "numeric", month: "short" };
    return `Today, ${date.toLocaleDateString("en-US", options)}`;
  };

  // Convert UNIX timestamp to readable time
  const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Weather icon mapping (basic example)
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      default:
        return "🌤️";
    }
  };

  return (
    <section
      className="w-full h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/dramatic-black-smoke-fire-danger-600nw-1927135535.jpg')",
      }}
    >
      <div className=" flex flex-col md:flex-row items-center justify-around items-center px-[5%] py-12 w-full h-screen">
        {/* Hero Content (Left Side) */}
        <div className="max-w-full md:max-w-[50%] text-white text-start mb-8 md:mb-0">
          <p className="text-lg mb-4 tracking-wider opacity-80">
            ---Weather and forecast
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 drop-shadow-lg">
            WEATHER IS A GREAT METAPHOR FOR LIFE
          </h1>
          <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">
            MORE INFO
          </button>
        </div>

        {/* Weather Card (Right Side) */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 sm:p-8 shadow-xl w-full max-w-lg">
          {loading ? (
            <p>Loading weather...</p>
          ) : weatherData ? (
            <>
              {/* Location and Weather Icon */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-bold text-2xl sm:text-3xl">Phnom Penh</h2>
                  <p className="text-gray-300 text-base sm:text-lg">
                    Today, 28 Feb
                  </p>
                </div>
                <div className="text-5xl sm:text-6xl">
                  {getWeatherIcon(weatherData.weather[0].main)}
                </div>
              </div>

              {/* Temperature and Weather Condition */}
              <div className="my-6 sm:my-8 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-7xl sm:text-8xl font-bold">
                    {Math.round(weatherData.main.temp)}°
                  </span>
                </div>
                <p className="text-xl sm:text-2xl capitalize mt-4">
                  {weatherData.weather[0].description}
                </p>
                <p className="text-gray-300 mt-2 text-base sm:text-lg">
                  Feels like {Math.round(weatherData.main.feels_like)}°
                </p>
              </div>

              {/* Weather Details (High and Low Temperature) */}
              <div className="border-t border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-orange-400"
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
                      <p className="text-gray-400 text-sm sm:text-base">High</p>
                      <p className="text-lg sm:text-xl">
                        {Math.round(weatherData.main.temp_max)}°
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-blue-400"
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
                      <p className="text-gray-400 text-sm sm:text-base">Low</p>
                      <p className="text-lg sm:text-xl">
                        {Math.round(weatherData.main.temp_min)}°
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunrise and Sunset */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-blue-400"
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
                      <p className="text-gray-400 text-sm sm:text-base">
                        Sunrise
                      </p>
                      <p className="text-lg sm:text-xl">
                        {formatTime(weatherData.sys.sunrise)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-orange-400"
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
                      <p className="text-gray-400 text-sm sm:text-base">
                        Sunset
                      </p>
                      <p className="text-lg sm:text-xl">
                        {formatTime(weatherData.sys.sunset)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Failed to load weather data</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
