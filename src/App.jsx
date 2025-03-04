// src/App.jsx
import "./App.css";
import NavBar from "./components/Header/Navbar";
import Home from "./components/pages/Home/Home"; // Adjust path as needed

function App() {
  return (
    <div>
      <NavBar />
      <main className="pt-20">
        <Home />
      </main>
    </div>
  );
}

export default App;
