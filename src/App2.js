import React, { useEffect, useState } from "react";
import { ErrorMessage } from "./components/error-message";
import { Location } from "./components/location";
import { Temperature } from "./components/temperature";

export const App = () => {
  const [degrees, setDegrees] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [celsius, setCelsius] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [message, setMessage] = useState("");
  const [scale, setScale] = useState("°F");
  const [isLocationEnabled, setLocation] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/ede2edb6f0eec845d430b56ec1ec12b9/${lat},${long}`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((listInfo) => {
            const { timezone, temperature, summary } = listInfo.currently;
            const fahrenheitToCelsius = Math.floor(
              (temperature - 32) * (5 / 9)
            );

            // Set DOM Elements from the API
            setDegrees(temperature);
            setMessage(summary);
            setLocalTime(timezone);
            setFahrenheit(temperature);
            setCelsius(fahrenheitToCelsius);
            setLocation(true);
          });
      });
    }
  }, []);

  const handleClick = () => {
    console.log("click");
    if (scale === "°F") {
      setScale("°C");
      setDegrees(celsius);
    } else {
      setScale("°F");
      setDegrees(fahrenheit);
    }
  };

  return (
    <div className="parentElement">
      <h1 className="mainTitle">Weather Today</h1>
      {!isLocationEnabled && <ErrorMessage />}
      <Location timezone={localTime} />
      <Temperature
        onClick={handleClick}
        degrees={degrees}
        scale={scale}
        message={message}
      />
    </div>
  );
};
