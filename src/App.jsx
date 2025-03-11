import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./components/Header/Navbar";
import Home from "./components/pages/Home/Home";
import Footer from "./components/Footer/Footer";
import AboutPage from "./components/pages/About/AboutPage";

function App() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="./components/pages/About/AboutPage"
            element={<AboutPage />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
