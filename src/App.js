import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeScreen />
    </div>
  );
}

export default App;
