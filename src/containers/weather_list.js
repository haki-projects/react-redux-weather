import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


 class WeatherList extends Component {
   renderWeather (cityData) {
     const name = cityData.city.name; //We must  create a unique key for each item in  the .map iterator and place it at our top level html tag ( <tr> )
     const temps = cityData.list.map(weather => weather.main.temp); //pulls the temperature off of the weather list
     const pressure = cityData.list.map(weather => weather.main.pressure);
     const humidity = cityData.list.map(weather => weather.main.humidity);
     const { lon, lat } = cityData.city.coord;



     return (
       <tr key={name}>
         <td> <GoogleMap lon={lon} lat={lat}/></td>
         <td>
            <Chart color='red' data={temps}  units='k'/>
        </td>
         <td>
            <Chart color='green' data={pressure} units='hPa'/>
        </td>
         <td>
            <Chart color='black' data={humidity} units='%'/>
        </td>
         </tr>
     );
   }

  render() {
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th> City </th>
            <th> Temperature (K) </th>
            <th> Pressure (hPa) </th>
            <th>Humidity (%)</th>
            </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}


        </tbody>
      </table>

    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);