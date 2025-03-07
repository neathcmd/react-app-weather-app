// src/components/pages/Home/Home.jsx
import React from "react";
import Hero from "./Hero";
import AboutSection from "./About";
import CambodiaForecast from "./CambodiaForecast";
import WeatherOverview from "./WeatherOverview";

const Home = () => {
  return (
    <div>
      <main>
        <div>
          <Hero />
          <AboutSection />
          <CambodiaForecast />
          <WeatherOverview />
        </div>
      </main>
    </div>
  );
};

export default Home;
