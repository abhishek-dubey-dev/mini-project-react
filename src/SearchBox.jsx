import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
export default function SearchBox({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const getWeatherInfo = async (cityName) => {
    if (!API_KEY) {
      throw new Error("Weather API key is not configured.");
    }

    let response = await fetch(
      `${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`,
    );
    let jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "No such place exist!"
          : jsonResponse.message || "Unable to load weather information.",
      );
    }

    return {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      temp_min: jsonResponse.main.temp_min,
      temp_max: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feels_like: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");

    try {
      const newInfo = await getWeatherInfo(city.trim());
      updateInfo(newInfo);
      setCity("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load weather information.",
      );
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city-name"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
      {error && (
        <p className="search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
