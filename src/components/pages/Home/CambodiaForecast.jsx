import React, { useState, useEffect } from "react";

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
      name: "Kampong Province",
      image: `/src/assets/Kampong-Province.jpg`,
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
      name: "Kampong Thom Province",
      image: `/src/assets/Kampong-Thom-Province.jpg`,
      lat: 12.7111, // Approximate latitude for Kampong Thom
      lon: 104.8887, // Approximate longitude for Kampong Thom
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Pursat Province",
      image: `/src/assets/Pursat-Province.jpg`,
      lat: 12.5388, // Approximate latitude for Pursat
      lon: 103.9192, // Approximate longitude for Pursat
      weatherIcon: "🌥️",
      temperature: -999,
    },
    {
      name: "Mondulkiri Province",
      image: `/src/assets/Mondulkiri-Province.jpg`,
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
      name: "Kampongcham Province",
      image: `/src/assets/Kampongcham-Province.jpg`,
      lat: 11.9924, // Approximate latitude for Kampong Cham
      lon: 105.4645, // Approximate longitude for Kampong Cham
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
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ProvinceCard component
  const ProvinceCard = ({ province }) => {
    return (
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow w-[240px] h-[190px]">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <img
            src={province.image}
            alt={`${province.name} image`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-2xl mb-1">{province.weatherIcon || "🌥️"}</div>
        <p className="text-sm font-medium text-gray-800 text-center break-words">
          {province.name}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {province.temperature === -999 ? "N/A" : `${province.temperature}°C`}
        </p>
      </div>
    );
  };

  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Cambodia Forecast
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      {/* First row of province cards */}
      <div className="flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 mb-4 max-w-5xl mx-auto">
        {firstRowProvinces.map((province, index) => (
          <ProvinceCard key={index} province={province} />
        ))}
      </div>

      {/* Second row of province cards */}
      <div className="flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 max-w-5xl mx-auto">
        {secondRowProvinces.map((province, index) => (
          <ProvinceCard key={index} province={province} />
        ))}
      </div>
    </section>
  );
};

export default CambodiaForecast;
