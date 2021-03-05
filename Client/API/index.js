import axios from 'axios'; //API Getter

//Gets all events
export const getEvent = () => 
    axios.get('https://osu-event-server.herokuapp.com/');
//Gets one event
export const getAEvent = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/get/'+id);
//Gets number of events
export const getCount = () => 
    axios.get('https://osu-event-server.herokuapp.com/count');
//Adds Attendee
export const addAttendee = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/addattendee/'+id);
//Remove Attendee
export const removeAttendee = (id) => 
    axios.get('https://osu-event-server.herokuapp.com/removeattendee/'+id);
//Updates the max slots of an event
export const updateMaxSlots = (id, num) => 
    axios.get('https://osu-event-server.herokuapp.com/updatemaxslots/'+id+'/'+num);
//Gets events with slots more that 0 [WILL REMOVE LATER]
export const getWithSlots = () => 
    axios.get('https://osu-event-server.herokuapp.com/getwithslots/');

//Gets events with slots more that 0 [WILL REMOVE LATER]
export const searchEvents = (keyword) => 
    axios.get('https://osu-event-server.herokuapp.com/search/' + keyword);
//Adds event
export const addEventToList = (name, description, location, edate, etime, slots, maxslots) => {
    const url = `https://osu-event-server.herokuapp.com/add/`;
    const data = {name, description, location,edate,etime, slots, maxslots};
    console.log(data);
    return axios({ method: 'post', url, data });
  };

//search
export const getEventByTime = (start,end) => 
    axios.get('https://osu-event-server.herokuapp.com/getByTime/'+start+'/'+end);