// src/components/pages/Home/Home.jsx
import React from "react";
// import Hero from "./Hero"; // Adjust path as needed
// import AboutSection from "./About"; // Adjust path as needed
// import CambodiaForecast from "./CambodiaForecast"; // Adjust path as needed
import WeatherOverview from "./WeatherOverview"; // Adjust path as needed

const Home = () => {
  return (
    <div>
      <main>
        {/* <Hero /> */}
        <div>
          {/* <AboutSection />
          <CambodiaForecast /> */}
          <WeatherOverview />
        </div>
      </main>
    </div>
  );
};

export default Home;
