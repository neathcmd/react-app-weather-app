import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./components/Header/Navbar";
import Home from "./components/pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div>
      <NavBar />

      <Home />

      <Footer />
    </div>
  );
}

export default App;
