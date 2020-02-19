import React from 'react';
import ReactDOM from 'react-dom';
import { Location } from "./components/location";
import { Temperature } from './components/temperature';
import { errorMessage } from './components/error-message';

export const App = () => {
  window.onload = () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSpan = document.querySelector('.scale');
    const temperatureSection = document.querySelector('.temperature');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/ede2edb6f0eec845d430b56ec1ec12b9/${lat},${long}`;

        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(listInfo => {
            const { temperature, summary } = listInfo.currently;

            console.log(listInfo);

            // Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = listInfo.timezone;

            const celsius = (temperature - 32) * (5 / 9);

            // Change temperature to C/F
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "°F") {
                temperatureSpan.textContent = "°C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "°F";
                temperatureDegree.textContent = temperature;
              }
            });
          });
      })
    }
    else {
      console.log("txt");
      ReactDOM.render(errorMessage(), document.getElementsByClassName("mainTitle"));
    }
  }

  return (
    <div className="parentElement">
      <h1 className="mainTitle">Weather Today</h1>
      <Location />
      <Temperature />
    </div>
  );
}
