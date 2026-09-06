import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Weather />

      <Footer />
    </div>
  );
}

export default App;