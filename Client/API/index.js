import axios from 'axios'; //API Getter
import { v4 as uuidv4 } from 'uuid'; //Creates unique IDs

//Gets user's affiliation to the school (student or !student)
export const getUser = (email) => {
    const url = 'https://osu-event-server.herokuapp.com/login';
    const data = {url};
    return axios({ method: 'get', url, data });
}


//Gets all events
export const getEvent = () => 
    axios.get('https://osu-event-server.herokuapp.com/');
//Removes Event
export const removeEvent = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/remove/'+id);   
//Gets one event
export const getAEvent = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/get/'+id);
//Gets number of events
export const getCount = () => 
    axios.get('https://osu-event-server.herokuapp.com/count');
//Adds Attendee
export const addAttendee = (id,email,name,array) => {
    array.push({'email':email,'name':name})
   return axios.get('http://localhost:8888/addattendee/'+id+"/"+JSON.stringify(array));
}
//Remove Attendee
export const removeAttendee = (id,array) => 
    axios.get('http://localhost:8888/addattendee/'+id+"/"+JSON.stringify(array));
//Updates the max slots of an event
export const updateMaxSlots = (id, num) => 
    axios.get('https://osu-event-server.herokuapp.com/updatemaxslots/'+id+'/'+num);
//Gets events with slots more that 0 [WILL REMOVE LATER]
export const getWithSlots = () => 
    axios.get('https://osu-event-server.herokuapp.com/getwithslots/');

//Search 
export const searchEvents = (keyword) => 
    axios.get('https://osu-event-server.herokuapp.com/search/' + keyword);
//Adds event
export const addEventToList = (name, description, location, edate, etime, slots, maxslots, author) => {
    const url = `https://osu-event-server.herokuapp.com/add/`;
    const id = uuidv4();
    const data = {id, name, description, location, edate, etime, slots, maxslots, author};
    //console.log(data);
    return axios({ method: 'post', url, data });
};
//Edits an event
export const editEvent = (id, name, description, location, edate, etime, slots, maxslots) => {
    const url = `https://osu-event-server.herokuapp.com/edit/`;
    const data = {id, name, description, location, edate, etime, slots, maxslots};
    //console.log(data);
    return axios({ method: 'post', url, data });
};
//Get events given a day
export const getEventByDay = (day) => 
    axios.get('https://osu-event-server.herokuapp.com/getByDay/'+day);
//Gets events 
export const getEventByTime = (start,end) => 
    axios.get('https://osu-event-server.herokuapp.com/getByTime/'+start+'/'+end);