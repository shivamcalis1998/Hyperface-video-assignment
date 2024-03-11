import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";
import { Route, Routes } from "react-router-dom";
import VideoScreen from "./components/VideoScreen/VideoScreen.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/video/:id" element={<VideoScreen />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
