import axios from 'axios'; //API Getter
import { v4 as uuidv4 } from 'uuid'; //Creates unique IDs

//const baseUrl = 'https://osu-event-server.herokuapp.com/';
const baseUrl = 'http://localhost:8888/';

//Gets user's affiliation to the school (student or !student)
export const getUser = (email) => {
    const url =baseUrl+ 'login/';
    const data = { email };

    //console.log(data);
    return axios({ method: 'post', url, data });
}


//Gets all events
export const getEvent = () => 
    axios.get(baseUrl);
//Removes Event
export const removeEvent = (id) => 
    axios.get(baseUrl+ 'remove/'+id);   
//Gets one event
export const getAEvent = (id) => 
    axios.get(baseUrl+ 'get/'+id);
//Gets number of events
export const getCount = () => 
    axios.get(baseUrl+ 'count');

//Adds Attendee
export const addAttendee = (id,email,name,array) => {
    array.push({'email':email,'name':name})
    const url = baseUrl+ 'addattendee/'+id+"/"+email+"/" +name+"/";//
    const data = JSON.stringify(array);
    return axios({ method: 'get', url, data });
}
//Remove Attendee
export const removeAttendee = (id,email,name,array) => {
    array.push({'email':email,'name':name})
    const url = baseUrl+ 'removeattendee/'+id+"/"+email+"/" +name+"/";//+email+"/" +name+"/"
    console.log(url);
    const data = JSON.stringify(array);
    return axios({ method: 'get', url, data });
}
//Get Attendee List 
export const getAttendee = (id) => {
    const url = baseUrl + 'getattendee/' + id +'/';
    return axios({method: 'get', url});
}
//Updates the max slots of an event
export const updateMaxSlots = (id, num) => 
    axios.get(baseUrl+ 'updatemaxslots/'+id+'/'+num);
//Gets events with slots more that 0 [WILL REMOVE LATER]
export const getWithSlots = () => 
    axios.get(baseUrl+ 'getwithslots/');

//Search 
export const searchEvents = (keyword) => 
    axios.get(baseUrl+ 'search/' + keyword);
//Adds event
export const addEventToList = (name, description, location, edate, etime, slots, maxslots, author) => {
    const url = baseUrl+ 'add/';
    const id = uuidv4();
    const data = {id, name, description, location, edate, etime, slots, maxslots, author};
    //console.log(data);
    return axios({ method: 'post', url, data });
};
//Edits an event
export const editEvent = (id, name, description, location, edate, etime, slots, maxslots) => {
    const url = baseUrl+ 'edit/';
    const data = {id, name, description, location, edate, etime, slots, maxslots};
    //console.log(data);
    return axios({ method: 'post', url, data });
};
//Get events given a day
export const getEventByDay = (day) => 
    axios.get(baseUrl+ 'getByDay/'+day);
//Gets events 
export const getEventByTime = (start,end) => 
    axios.get(baseUrl+ 'getByTime/'+start+'/'+end);