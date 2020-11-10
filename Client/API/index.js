import axios from 'axios'; //API Getter



//Gets lodging api from our server;
export const getLodge = () => 
    axios.get('https://osu-event-app.herokuapp.com/lodgings');

