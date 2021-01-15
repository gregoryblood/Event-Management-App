import axios from 'axios'; //API Getter



//Gets event api from our server;
export const getEvent = () => 
    axios.get('https://osu-event-server.herokuapp.com/');

//Adds tracks to a given playlist
export const addEventToList = (name, description, location) => {
    const url = `https://osu-event-server.herokuapp.com/events`;
    const data = {name, description, location};
    console.log(data);
    return axios({ method: 'post', url, data });
  };
