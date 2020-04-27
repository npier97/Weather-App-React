import PropTypes from "prop-types";
import ReactAnimatedWeather from "react-animated-weather";

ReactAnimatedWeather.defaultProps = {
  animate: true,
  size: 10,
  color: "black",
};

ReactAnimatedWeather.propTypes = {
  icon: PropTypes.oneOf([
    "CLEAR_DAY",
    "CLEAR_NIGHT",
    "PARTLY_CLOUDY_DAY",
    "PARTLY_CLOUDY_NIGHT",
    "CLOUDY",
    "RAIN",
    "SLEET",
    "SNOW",
    "WIND",
    "FOG",
  ]).isRequired,
  animate: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
};
