import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { errorMessage } from "./components/error-message";
import { Location } from "./components/location";
import { Temperature } from "./components/temperature";

export const App = () => {
  // const [data, setData] = useState({
  //   degrees: "",
  //   fahrenheit: "",
  //   celsius: "",
  //   localTime: "",
  //   message: "",
  // }); IS THERE A WAY TO REGROUP THEM ? AND THEN USE LIKE:
  // e.g. line 51 setData({ degrees: temperature }); / setData({ message: summary });
  // => Probably will get the same error I had at the beginning = "Error: Objects are not valid as a React child"

  const [degrees, setDegrees] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [celsius, setCelsius] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [message, setMessage] = useState("");
  const [scale, setScale] = useState("°F");

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
          });
      });
    } else {
      console.log("txt");
      ReactDOM.render(
        errorMessage(),
        document.getElementsByClassName("mainTitle")
      );
    }
  });

  return (
    <div className="parentElement">
      <h1 className="mainTitle">Weather Today</h1>
      <Location />
      <Temperature
        onClick={() => {
          if (scale === "°F") {
            setScale({ scale: "°C" });
            setDegrees({ temperature: celsius });
          } else {
            setScale({ scale: "°F" });
            setDegrees({ temperature: fahrenheit });
          }
        }}
        degrees={degrees}
        scale={scale}
        message={message}
      />
    </div>
  );
};
