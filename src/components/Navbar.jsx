import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">

        <div className="brand-icon">
          ☁️
        </div>

        <div className="brand-text">
          <h2>Weatherly</h2>
          <span>Weather Forecast</span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;