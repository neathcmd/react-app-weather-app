import React, { useState, useEffect } from "react";

// CambodiaForecast Component
const CambodiaForecast = () => {
  const [provinces, setProvinces] = useState([
    {
      name: "Preah Province",
      image: `/src/assets/Pailin-Province.jpg`,
      lat: 12.8489, // Approximate latitude for Pailin (Preah Province)
      lon: 102.6093, // Approximate longitude for Pailin
      weatherIcon: "🌥️", // Initial placeholder
      temperature: -999, // Initial placeholder
    },
    {
      name: "Battambang Province",
      image: `/src/assets/Battambang-Province.jpg`,
      lat: 13.0957, // Approximate latitude for Battambang
      lon: 103.2022, // Approximate longitude for Battambang
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "KohKong Province",
      image: `/src/assets/KohKong-Province.jpg`,
      lat: 11.9924, // Approximate latitude for Kampong Cham (representing Kampong Province)
      lon: 105.4645, // Approximate longitude for Kampong Cham
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Prey Veng Province",
      image: `/src/assets/PreyVeng-Province.jpg`,
      lat: 11.4868, // Approximate latitude for Prey Veng
      lon: 105.3253, // Approximate longitude for Prey Veng
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Kampongcham Province",
      image: `/src/assets/Kompongchhang-Province.jpg`,
      lat: 11.9924, // Approximate latitude for Kampong Cham
      lon: 105.4645, // Approximate longitude for Kampong Cham
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "PreahVihear Province ",
      image: `/src/assets/PreahVihear-Province .jpg`,
      lat: 12.5388, // Approximate latitude for Pursat
      lon: 103.9192, // Approximate longitude for Pursat
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Mondulkiri Province",
      image: `/src/assets/Modulkiri-Province.jpg`,
      lat: 12.4555, // Approximate latitude for Mondulkiri
      lon: 107.1878, // Approximate longitude for Mondulkiri
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Kep Province",
      image: `/src/assets/Kep-Province.jpg`,
      lat: 10.4833, // Approximate latitude for Kep
      lon: 104.3167, // Approximate longitude for Kep
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Kampongspeu Province",
      image: `/src/assets/Kompongspeu-Province.jpg`,
      lat: 11.6155, // Approximate latitude for Kampong Speu
      lon: 104.5209, // Approximate longitude for Kampong Speu
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Kampong Thom Province",
      image: `/src/assets/KompongThom-Province.jpg`,
      lat: 12.7111, // Approximate latitude for Kampong Thom
      lon: 104.8887, // Approximate longitude for Kampong Thom
      weatherIcon: "🌥️",
      temperature: -999,
    },
  ]);

  // Split the provinces into two rows
  const firstRowProvinces = provinces.slice(0, 5);
  const secondRowProvinces = provinces.slice(5);

  // Function to map weather conditions to emoji icons
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "☀️"; // Sunny
      case "clouds":
        return "⛅"; // Partly cloudy
      case "rain":
        return "🌧️"; // Rainy
      case "drizzle":
        return "🌦️"; // Sunny with rain
      case "thunderstorm":
        return "🌩️"; // Thunderstorm
      case "snow":
        return "❄️"; // Snowy
      case "mist":
      case "fog":
        return "🌫️"; // Foggy
      case "tornado":
        return "🌪️"; // Tornado
      default:
        return "🌥️"; // Default for other conditions (e.g., haze, smoke)
    }
  };

  // Function to fetch weather data for a province
  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "b93932bbe1df60eb75e5596059faf22e"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return {
        weatherIcon: getWeatherIcon(data.weather[0].main),
        temperature: Math.round(data.main.temp), // Temperature in Celsius, rounded
      };
    } catch (error) {
      console.error(
        `Error fetching weather for lat=${lat}, lon=${lon}:`,
        error
      );
      return {
        weatherIcon: "🌥️", // Fallback icon
        temperature: -999, // Fallback temperature as a number
      };
    }
  };

  // Fetch and update weather data for all provinces
  const updateWeatherData = async () => {
    const updatedProvinces = await Promise.all(
      provinces.map(async (province) => {
        const weatherData = await fetchWeatherData(province.lat, province.lon);
        return {
          ...province,
          weatherIcon: weatherData.weatherIcon,
          temperature: weatherData.temperature,
        };
      })
    );
    setProvinces(updatedProvinces);
  };

  // Use effect to fetch weather data on mount and every 5 minutes
  useEffect(() => {
    updateWeatherData(); // Initial fetch

    const interval = setInterval(() => {
      updateWeatherData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // ProvinceCard Component
  const ProvinceCard = ({ province }) => {
    return (
      <div className="bg-gray-100 rounded-lg p-3 sm:p-4 md:p-5 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[220px] sm:max-w-[240px] h-[180px] sm:h-[200px] md:h-[220px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mb-1 sm:mb-2 md:mb-3">
          <img
            src={province.image}
            alt={`${province.name} image`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 md:mb-3">
          {province.weatherIcon || "🌥️"}
        </div>
        <div className="flex flex-col items-center flex-grow">
          <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 text-center break-words line-clamp-2">
            {province.name}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
            {province.temperature === -999
              ? "N/A"
              : `${province.temperature}°C`}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Cambodia Forecast
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      {/* Grid layout for province cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto cursor-pointer">
        {provinces.map((province, index) => (
          <ProvinceCard key={index} province={province} />
        ))}
      </div>
    </section>
  );
};

export default CambodiaForecast;
