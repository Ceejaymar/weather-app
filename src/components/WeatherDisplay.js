import React from 'react';
import Moment from 'react-moment';

const WeatherDisplay  = ({ info, thermometer }) => {
  const { minTempF, minTempC, maxTempF, maxTempC, dateTimeISO, icon } = info;
  let minTemp, maxTemp, deg;

  if (thermometer === 'fahrenheit') {
    minTemp = minTempF;
    maxTemp = maxTempF;
    deg = 'F'
  }
  else {
    minTemp = minTempC;
    maxTemp = maxTempC;
    deg = "C"
  }

  return (
    <div className="weather-info"> 
      <Moment format="ddd MM/DD">{ dateTimeISO }</Moment> 
      <img src={require(`../../public/icons/${icon}`)} alt="weather icon"/>   
      <div>High: { maxTemp }°{ deg }</div>
      <div>Low: { minTemp }°{ deg }</div>    
    </div>
  )
}

export default WeatherDisplay;