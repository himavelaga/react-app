import React, { Component }  from 'react';
//import './App.css';
import{
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Input,
  Col
} from 'reactstrap';

import Weather from './Weather';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       weather: null, //tracking the weather for the current city
       cityList: [],
       newCityName: '' //new city to add to database
    };
  }

  getCityList = () => {
    //provide the url to our city's api endpoint & AN http get REQUEST WILL BE MADE
    //similar to ajax call in jquery to asynchronously downloading data
    //after fetch, the responses returned is acknowledged to be in JSON format
    //& the city names are stored in city list array and the state is updated
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };

  //update the newCityName variable with the value entered by user. with the event variable passed in by onChange listener, we enter the target object & get the value attribute & ipdated the newCityName state variable
  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  //after user submits new city name, it is added to the database
  handleAddCity = () => {
    //specify criteria to Fetch API 
    //1. POST request 2.header property : tell server that we are sending JSON data as body 3. body : newCityName converted to JSON
    //FIRST then method - specify that we want the response from server to be in JSON.
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json())
    .then(res => {
    // nothing meaningful being returned since this POST but we need to trigger some actions
    //call getCitylIST() to updateout state variable for city list since it changed.
    //reset city name variable to empty string so they can type again

      this.getCityList();
      this.setState({ newCityName: '' });
    });
  };

  //get weather data from api endpoint we created
  getWeather = (city) => {
    //fetch with api endpoint url. backticks - allow you to insert a parameter directly into a string without having to concatenate
    
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({ weather }); //update the state variable weather 
    });
  }

  //called when a city is selected to get weather for to update the state variable weather & UI
  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  }

  //called by react when the component is started. used to fetch data & initialize state
  componentDidMount () {
    this.getCityList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">Weather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron> 
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities!</p>
              <InputGroup>
                <Input 
                  placeholder="New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
                
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                { this.state.cityList.length > 0 && <option>Select a city.</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }
}

export default App;

//jumbotron - a large banner
//Input - value of the text input is going to be populated by our new city name state variable
// & the event listener gets triggered when user types in.