import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'goldenrod',
  size: 100,
  animate: true
};

export const Temperature = (props) => {

  return(
    <div className="temperature">
      <div className="degree-section">
        <h2 className="temperature-degree">{props.temperature}</h2>
          <span className="scale">{props.scale}</span>
      </div>
      <div className="description">{props.message}</div>

      <ReactAnimatedWeather className="weatherIcon"
        icon={defaults.icon}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
    </div>
  );
}
