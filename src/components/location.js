import PropTypes from "prop-types";
import React from "react";

export const Location = ({ timezone }) => (
  <div className="location">
    <h1 className="location-timezone">{timezone}</h1>
    <canvas className="icon" width="128" height="128"></canvas>
  </div>
);

Location.propTypes = {
  timezone: PropTypes.bool,
};
