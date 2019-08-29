import React from 'react';
import Title from './component/Title';
import Form from './component/Form'
import Wheather from './component/Wheather';

const API_KEY = '55d589cdc8baa6b14ff8958a4e240c65';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWheather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data)
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  render() {
    return (
      <div > 
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-4 title-container">
                  <Title />
                </div>
                <div className="col-sm-8 form-container">
                  <Form className="col-xs-8" getWheather={this.getWheather} />
                  <Wheather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default App;

