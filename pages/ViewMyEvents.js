import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import { getWithSlots } from '../Client/API/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewMyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

    };
  }
  componentDidMount() {
    this.getEvent();
  }

  async getEvent() {
    //Calls api and will finish when data is loaded
    const { data } = await getWithSlots();
    this.setState({ data });
  }

  showList(arr) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => this.props.navigation.navigate('EventView', { 
                                        name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        fromMyEvent: true
                                        })}>
      <View style={styles.event} >
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.location}>{event.location} at {event.etime.slice(0,5)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
      </View>
      </TouchableOpacity>
    })
  }

  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar', {fromMyEvent: true})} 
          style={{ flex: 1, textAlign: 'right', position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
            <View style={{ margin: 12 }}>
              <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 10, backgroundColor: "#fff", padding: 6,  border: '1px solid #ff9900', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}><Ionicons name={"ios-calendar"} size={30} color={"#666"} /></View>
              <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 45, backgroundColor: "#ff9900", padding: 6,  border: '1px solid #ff9900', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}><Ionicons name={"ios-list"} size={30} color={"#fff"} /></View>
            </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <React.Fragment>
          { //If data then display api otherwise loading indicator
            data ? ( //if data
              <React.Fragment>

                <View style={styles.eventbox}>
                  {data && this.showList(this.state.data)}
                </View>
                <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent')}>
                  <Ionicons style={styles.icon} name={'ios-add'} size={45} color={'white'} />
                </TouchableOpacity>
              </React.Fragment>
              
            )
              : //else 
              (<ActivityIndicator />)
          }
          </React.Fragment>
          
        </View>
        
      </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -5
  },
  createbutton:{
    position: 'fixed',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: 'orange',
    margin: 20,
    padding: 13,
    bottom: '45px',
    right: '10px',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%'
  },
  calendar: {
    position: 'absolute',
    top: 10,
    right: 10, 
  },
  event: {
    flexDirection: "column",
    //height: 100,
    padding: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  title: {
    color: "orange",
    fontWeight: 'bold',
    fontSize: 22
  },
  description: {
    fontSize: 16
  },
  location: {
    fontSize: 16,
    fontStyle: "italic",
    color: 'gray'
  },
});