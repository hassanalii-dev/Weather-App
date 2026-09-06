import { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${encodeURIComponent(
          cityName
        )}`
      );

      if (!response.ok) {
        throw new Error("Weather data could not be found.");
      }

      const data = await response.json();

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <main className="weather-section">
      <div className="weather-container">

        {/* Hero Section */}

        <div className="hero-text">
          <span className="eyebrow">
            REAL-TIME FORECAST
          </span>

          <h1>
            Weather App By
            <span> Hassan Ali</span>
          </h1>

          <p>
            Search any city and get the latest weather
            conditions instantly.
          </p>
        </div>

        {/* Search Box */}

        <form
          className="search-box"
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter City Name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="loading-card">
            <div className="loader"></div>

            <p>
              Fetching weather data...
            </p>
          </div>
        ) : weather ? (

          /* =========================
             WEATHER CARD
          ========================= */

          <div className="weather-card">

            {/* City + Region */}

            <div className="weather-top">

              <div>
                <span className="location-label">
                  CURRENT WEATHER
                </span>

                <h2>
                  {weather.location?.name ||
                    weather.city ||
                    city}
                </h2>

                <p className="country">
                  {weather.location?.region
                    ? `${weather.location.region}, ${
                        weather.location.country || ""
                      }`
                    : weather.region
                    ? `${weather.region}, ${
                        weather.country || ""
                      }`
                    : weather.country ||
                      "Weather forecast"}
                </p>
              </div>

            </div>

            {/* Temperature */}

            <div className="temperature-area">

              <div className="temperature">
                {weather.current?.temp_c ??
                  weather.temp_c ??
                  weather.temperature ??
                  "--"}

                <sup>°C</sup>
              </div>

              <div className="condition">

                <strong>
                  {weather.current?.condition?.text ||
                    weather.condition ||
                    "Current Conditions"}
                </strong>

                <span>
                  Feels like{" "}
                  {weather.current?.feelslike_c ??
                    weather.feelslike_c ??
                    "--"}
                  °C
                </span>

              </div>

            </div>

            {/* =========================
               WEATHER DETAILS
            ========================= */}

            <div className="weather-details">

              {/* Humidity */}

              <div className="detail-item">

                <span className="detail-icon">
                  💧
                </span>

                <div>
                  <small>
                    Humidity
                  </small>

                  <strong>
                    {weather.current?.humidity ??
                      weather.humidity ??
                      "--"}
                    %
                  </strong>
                </div>

              </div>

              {/* Wind */}

              <div className="detail-item">

                <span className="detail-icon">
                  🌬️
                </span>

                <div>
                  <small>
                    Wind
                  </small>

                  <strong>
                    {weather.current?.wind_kph ??
                      weather.wind_kph ??
                      weather.wind ??
                      "--"}{" "}
                    km/h
                    {(
                      weather.current?.wind_dir ||
                      weather.wind_dir
                    ) && (
                      <>
                        {" "}
                        (
                        {weather.current?.wind_dir ||
                          weather.wind_dir}
                        )
                      </>
                    )}
                  </strong>
                </div>

              </div>

              {/* Cloud Cover */}

              <div className="detail-item">

                <span className="detail-icon">
                  ☁️
                </span>

                <div>
                  <small>
                    Cloud Cover
                  </small>

                  <strong>
                    {weather.current?.cloud ??
                      weather.cloud ??
                      weather.cloud_cover ??
                      "--"}
                    %
                  </strong>
                </div>

              </div>

              {/* Rain Chance */}

              <div className="detail-item">

                <span className="detail-icon">
                  🌧️
                </span>

                <div>
                  <small>
                    Rain Chance
                  </small>

                  <strong>
                    {weather.current?.chance_of_rain ??
                      weather.chance_of_rain ??
                      weather.rain_chance ??
                      "--"}
                    %
                  </strong>
                </div>

              </div>

              {/* Pressure */}

              <div className="detail-item">

                <span className="detail-icon">
                  🧭
                </span>

                <div>
                  <small>
                    Pressure
                  </small>

                  <strong>
                    {weather.current?.pressure_mb ??
                      weather.pressure_mb ??
                      weather.pressure ??
                      "--"}{" "}
                    mb
                  </strong>
                </div>

              </div>

              {/* Visibility */}

              <div className="detail-item">

                <span className="detail-icon">
                  👁️
                </span>

                <div>
                  <small>
                    Visibility
                  </small>

                  <strong>
                    {weather.current?.vis_km ??
                      weather.visibility_km ??
                      weather.visibility ??
                      "--"}{" "}
                    km
                  </strong>
                </div>

              </div>

              {/* UV Index */}

              <div className="detail-item">

                <span className="detail-icon">
                  ☀️
                </span>

                <div>
                  <small>
                    UV Index
                  </small>

                  <strong>
                    {weather.current?.uv ??
                      weather.uv ??
                      weather.uv_index ??
                      "--"}
                  </strong>
                </div>

              </div>

              {/* Heat Index */}

              <div className="detail-item">

                <span className="detail-icon">
                  🔥
                </span>

                <div>
                  <small>
                    Heat Index
                  </small>

                  <strong>
                    {weather.current?.heatindex_c ??
                      weather.heatindex_c ??
                      weather.heat_index ??
                      "--"}
                    °C
                  </strong>
                </div>

              </div>

            </div>

          </div>

        ) : (

          /* =========================
             EMPTY STATE
          ========================= */

          <div className="empty-state">

            <span>🌤️</span>

            <h3>
              Enter City Name...
            </h3>

            <p>
              Enter a city above to see its weather.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}

export default Weather;