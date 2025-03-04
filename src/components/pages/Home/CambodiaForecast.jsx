// src/components/CambodiaForecast.jsx
import React from "react";

const CambodiaForecast = () => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Cambodia Forecast
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            key={item}
            className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
            <span className="text-sm font-medium">Location {item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CambodiaForecast;
