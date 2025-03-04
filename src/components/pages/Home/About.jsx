// src/components/AboutSection.jsx
import React from "react";

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-20">
      <div className="md:w-1/2 bg-gray-800 rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Rainy puddle"
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
        <h2 className="text-3xl font-bold mb-4">
          Rainy days bring out the best puddles
        </h2>
        <p className="text-gray-600 mb-6">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-600">
          <div>
            <h4 className="font-semibold">UV Index</h4>
            <p>8</p>
          </div>
          <div>
            <h4 className="font-semibold">Wind Speed</h4>
            <p>7 km/h</p>
          </div>
          <div>
            <h4 className="font-semibold">Humidity & Feel</h4>
            <p>65%</p>
          </div>
          <div>
            <h4 className="font-semibold">Visibility</h4>
            <p>10 km</p>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
