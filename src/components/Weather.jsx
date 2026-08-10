import { useEffect, useState } from "react";
import "./weather.scss";

const getWeatherInfo = (code) => {
  if (code === 0) {
    return {
      icon: "☀️",
      condition: "Clear Sky",
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      icon: "🌤️",
      condition: "Partly Cloudy",
    };
  }
  if (code === 45 || code === 48) {
    return {
      icon: "🌫️",
      condition: "Foggy",
    };
  }
  if (code >= 51 && code <= 67) {
    return {
      icon: "🌧️",
      condition: "Rainy",
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      icon: "❄️",
      condition: "Snowy",
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      icon: "🌦️",
      condition: "Rain Showers",
    };
  }
  if (code >= 95 && code <= 99) {
    return {
      icon: "⛈️",
      condition: "Thunderstorm",
    };
  }
  return {
    icon: "🌤️",
    condition: "Unknown",
  };
};

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Weather API
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
          );

          if (!weatherResponse.ok) {
            throw new Error("Weather API failed");
          }

          const weatherData = await weatherResponse.json();
          setWeather(weatherData.current);

          // Location API
          const locationResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (locationResponse.ok) {
            const locationData = await locationResponse.json();
            setLocation(locationData);
          }
        } catch (error) {
          console.error("Weather error:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      }
    );
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="weather">
        <span className="weather-icon">🌤️</span>
        <div className="weather-info">
          <div className="weather-status">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!weather) {
    return (
      <div className="weather">
        <span className="weather-icon">🌤️</span>
        <div className="weather-info">
          <div className="weather-status">
            Weather unavailable
          </div>
        </div>
      </div>
    );
  }

  const city =
    location?.city ||
    location?.locality ||
    location?.principalSubdivision ||
    "Current Location";
  const weatherInfo = getWeatherInfo(weather.weather_code);

  return (
    <div className="weather">
      <span className="weather-icon">
        {weatherInfo.icon}
      </span>
      <div className="weather-info">
        <div className="temperature">
          {Math.round(weather.temperature_2m)}°C
        </div>
        <div className="city">
          {city}
        </div>
        <div className="condition">
          {weatherInfo.condition}
        </div>
      </div>
    </div>
  );
};

export default Weather;