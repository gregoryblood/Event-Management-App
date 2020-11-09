import axios from 'axios'; //API Getter



//Gets lodging api from our server;
export const getLodge = () => 
    axios.get('http://localhost:8888/lodgings');

