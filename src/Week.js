import React, { Component } from 'react';
import axios from 'axios';

class Week extends Component {
  constructor() {
    super();
    this.state = ({
      weather:[]
    });


    this.getCoords = this.getCoords.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount(){
    this.getCoords();
  }

  getCoords(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        console.log(data);
        this.getUrl(data.coords.latitude, data.coords.longitude);
      });
    } else { 
      console.log("geolocation services off");
    }
  }

  getUrl(latitude, longitude){
    var url = 'https://api.weather.gov/points/' + latitude + ',' + longitude;
    axios.get(url)
      .then((response) => {
        console.log(response.data.properties);
        this.getWeather(response.data.properties.forecast);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getWeather(url){
    axios.get(url)
      .then((response) => {
        this.setState({weather: response.data.properties.periods});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRows(){
    return this.state.weather.map((object, i) => {
      return(
              <div className="col-md-6" key={i} style={{width:'100%'}}>
                <div>
                  <img alt='' style={{float: "right", marginBottom: "15px", marginLeft: "15px"}} src={object.icon} width="100" />
                  <h4>{object.name}: {object.shortForecast}</h4>
                  <p>{object.temperature}° {object.temperatureUnit}, Wind {object.windSpeed} {object.windDirection}</p>
                  <p>{object.detailedForecast}</p>
                  <br style={{clear: "both"}} />
                </div>
                
              </div>
          )
      
    })
  }

  render() {
    return (
      <div className="container" style={{paddingTop:'75px', paddingLeft:'0px', paddingRight:'0px'}}>
        <div className="row">
          {this.getRows()}
        </div>
      </div>
    )}
}

export default Week;
