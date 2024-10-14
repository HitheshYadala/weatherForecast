import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Forecasts from './Forecasts';
import '../styles/SearchBar.css'; 

const WeatherForecast = ({ }) => {
  const [forecast, setForecast] = useState([]);
  const [queryStr, setQueryStr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async() => {
    if(queryStr.length <= 0){
      alert('Please enter a City Name')
    }else{
  
  
    setLoading(true);
    try {
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=${queryStr}`).then(res => {
      console.log("response------", res.status)
      const filteredForecast = filterWeatherData(res.data.list);
      setForecast(filteredForecast);
      setLoading(false)
    })

  }catch (error) {
    setLoading(false)
    console.error('Error fetching weather data:', error);
    alert("City Name Incorrect")
    setForecast([])
    
  }
}
}

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setQueryStr(e.target.value);
  };

  const filterWeatherData = (data) => {

    const daysForecast = [];
    const uniqueDays = new Set();

    data.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0]
      const time = entry.dt_txt.split(' ')[1]

      if (time === '21:00:00' && !uniqueDays.has(date)) {
        uniqueDays.add(date)
        daysForecast.push(entry)
      }
    });

    return daysForecast.slice(0, 5);
  };




  return (
    <div>
      <div className="search-bar">
        <h1 className = "app-name">Weather in your city</h1>
        <div className = 'search-container'>
        <input
          type="text"
          value={queryStr}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </div>
      <div className = 'tableContainer'>
        {
        loading ? <>Loading...</> :
        forecast.map((day, index) => (
          <div style={{width:"100%", margin:'10px'}}>
          
          <Forecasts
            day = {day.dt_txt.split(' ')[0]}
            min_temp = {day.main.temp_min}
            max_temp = {day.main.temp_max}
            humidity = {day.main.humidity}
            pressure = {day.main.pressure}
          />
        
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default WeatherForecast;
