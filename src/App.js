import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const APIKey = "fc1c631590e5a021a13f35b630a705da"


class App extends Component {
  constructor(props) {
    super(props)
  
    // Setting the default values
    this.state = {
       city: undefined,
       country: undefined,
       icon: undefined,
       main: undefined,
       celsius: undefined,
       temp_max: undefined,
       temp_min: undefined,
       description: "",
       error: false
    }

    // Initializing the weather icons
    this.weatherIcon={
      Thunderstrom:"wi-thunderstrom",
      Drizzle:"wi-sleet",
      Rain:"wi-strom-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  }

  // Calculating celcius from gallon
  calCelsius(temp){
    let cel = Math.floor(temp - 273.15)
    return cel;
  }

  // Setting the weather icon according to the ID
  getWeatherIcon(icons,rangeID){
    switch(true){
      case rangeID>=200&&rangeID<=232:
        this.setState({icon:this.weatherIcon.Thunderstrom});
        break;
      case rangeID>=300&&rangeID<=321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;
      case rangeID>=500&&rangeID<=531:
        this.setState({icon:this.weatherIcon.Rain});
        break;
      case rangeID>=600&&rangeID<=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
      case rangeID>=701&&rangeID<=781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;
      case rangeID===800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
      case rangeID>=801&&rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
    }
  }

  // Getting the weather data asynchronously
  getWeather = async (event) => {

    // Preventing from submitting the form
    event.preventDefault();

    //City and Country variables
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    if((city&&country) || city)
    {
      //API calling
      const APICall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKey}`)

      //Response of the API
      const response = await APICall.json();

      // console.log(response)

      // Setting the values to the state with temparture, maximum and minimum temprature, description
      this.setState({
        city:`${response.name}, ${response.sys.country}`,
        celsius:this.calCelsius(response.main.temp),
        temp_max:this.calCelsius(response.main.temp_max),
        temp_min:this.calCelsius(response.main.temp_min),
        description:response.weather[0].description
      });

      // Setting the id for weather icon so that it can display the icon accordingly
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id);
    }
    else{
      // if any error is caught then the error is true
      this.setState({error:true})
    }
  }
  
  render() {
    return (
      <div className="App">
        {/* Form For input */}
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        {/* Weather component which is sending information */}
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        celsius={this.state.celsius} 
        temp_max={this.state.temp_max} 
        temp_min={this.state.temp_min} 
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}

export default App