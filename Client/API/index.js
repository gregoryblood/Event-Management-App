import axios from 'axios';

//Gets weather api for corvallis
export const getWeather = () => 
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=corvallis&appid=359129023dbd2efbbf6a1118594099e0');