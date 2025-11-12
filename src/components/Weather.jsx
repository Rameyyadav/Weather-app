import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'

const Weather = () => {
  const inputRef = useRef();
  const [weatherdata, setweatherdata] = useState(null);
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return; // ✅ prevent empty fetch
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setweatherdata({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: data.main.temp,
          location: data.name,
          icon: icon,
        });
      } else {
        setweatherdata(null);
        console.error("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Pokhara");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" value={city} onChange={(e) => setCity(e.target.value)} />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} style={{ cursor: "pointer" }} />
      </div>

      {weatherdata ? (
        <>
          <img src={weatherdata.icon} className="weather-icon" alt="weather" />
          <p className="temperature">{Math.round(weatherdata.temperature)}°c</p>
          <p className="location">{weatherdata.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherdata.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{ marginTop: "20px" }}>No data available</p>
      )}
    </div>
  );
};

export default Weather;
