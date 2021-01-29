import axios from 'axios'; //API Getter




//Gets all events
export const getEvent = () => 
    axios.get('https://osu-event-server.herokuapp.com/');
//Gets one event
export const getAEvent = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/'+id);
//Gets number of events
export const getCount = () => 
    axios.get('https://osu-event-server.herokuapp.com/count');

//Adds tracks to a given playlist
export const addEventToList = (name, description, location) => {
    const url = `https://osu-event-server.herokuapp.com/events`;
    const data = {name, description, location};
    console.log(data);
    return axios({ method: 'post', url, data });
  };

