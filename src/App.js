import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Location } from "./components/location";
import { Temperature } from "./components/temperature";
import { errorMessage } from "./components/error-message";

export class App extends Component {
  constructor(props) {
    super(props);
    this.someMethod = this.someMethod.bind(this);
    this.state = {
      temperature: "",
      fahrenheit: "",
      celsius: "",
      scale: "°F",
      timezone: "",
      message: ""
    };
  }

  someMethod() {
    if(this.state.scale === "°F") {
      this.setState({scale: "°C"});
      this.setState({temperature: this.state.celsius});
    } else {
      this.setState({scale: "°F"});
      this.setState({temperature: this.state.fahrenheit});
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
  
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/ede2edb6f0eec845d430b56ec1ec12b9/${lat},${long}`;
  
        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(listInfo => {
            const { timezone, temperature, summary } = listInfo.currently;
  
            console.log("onMount", listInfo);
  
            // Set DOM Elements from the API
            this.setState({temperature: temperature});
            this.setState({message: summary});
            this.setState({timezone: timezone});
            this.setState({fahrenheit: temperature});
            this.setState({celsius: Math.floor((temperature - 32) * (5 / 9))});
          });
      })
    } else {
      console.log("txt");
      ReactDOM.render(
        errorMessage(),
        document.getElementsByClassName("mainTitle")
      );
    }
  }

  render() {
    return (
      <div className="parentElement">
        <h1 className="mainTitle">Weather Today</h1>
        <Location />
        <Temperature onClick={this.someMethod} temperature={this.state.temperature} scale={this.state.scale} message={this.state.message}/>
      </div>
    );
  }
}
