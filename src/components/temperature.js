import PropTypes from "prop-types";
import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export const Temperature = ({
  onClick,
  degrees,
  scale,
  message,
  icon,
  color,
  size,
  animate,
}) => (
  <div className="temperature" onClick={onClick}>
    <div className="degree-section">
      <h2 className="temperature-degree">{degrees}</h2>
      <span className="scale">{scale}</span>
    </div>
    <div className="description">{message}</div>

    <ReactAnimatedWeather
      className="weatherIcon"
      icon={icon}
      color={color}
      size={size}
      animate={animate}
    />
  </div>
);

Temperature.defaultProps = {
  icon: "CLEAR_DAY",
  color: "goldenrod",
  size: 100,
  animate: true,
};

Temperature.propTypes = {
  onClick: PropTypes.func,
  degrees: PropTypes.number,
  scale: PropTypes.string,
  message: PropTypes.string,
};
