import React, { Component } from 'react';
import axios from 'axios';
import { clientId, clientSecret } from './config-keys';

import WeatherDisplay from './components/WeatherDisplay';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zipcode : '',
      weatherPeriod: [],
      temperature: 'fahrenheit'
    }
  }

  handleChange = (e) => {
    this.setState({ zipcode : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://api.aerisapi.com/forecasts/${this.state.zipcode}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then(response => {
      const weatherInfo = response.data.response[0];
      const weatherPeriod = weatherInfo.periods;

      this.setState({ weatherPeriod: [ ...weatherPeriod ]})
    })  
  }

  handleFTemp = () => {
    this.state.temperature === 'celsius' ? this.setState({ temperature: 'fahrenheit' }) : null
  }

  handleCTemp = () => {
    this.state.temperature === 'fahrenheit' ? this.setState({ temperature: 'celsius' }) : null
  }

  render() {
    return (
      <div className="App">
          <div className="main-section">
            <div className="temp-options">
              <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange.bind(this)} placeholder="Enter Your Zipcode" />
                <button type='submit'>Submit</button>
              </form>
              <div>
                <span onClick={this.handleCTemp} className="temp">C</span> | <span onClick={this.handleFTemp} className="temp">F</span>
              </div>
            </div>
            <div className="weather-container">
              {
                this.state.weatherPeriod.map((dayInfo, key) => {
                  return <WeatherDisplay key={key} info={dayInfo} thermometer={this.state.temperature} />
                })
              }
            </div>
        </div>
      </div>
    );
  }
}

export default App;
