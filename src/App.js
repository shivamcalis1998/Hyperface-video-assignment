import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";
import { Route, Routes } from "react-router-dom";
import VideoScreen from "./components/VideoScreen/VideoScreen.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/video/:id" element={<VideoScreen />} />
      </Routes>
    </div>
  );
}

export default App;
