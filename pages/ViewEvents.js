import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent,addEventToList } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import { MilToCil } from './HelperFuncs.js';
import { ProgressBar, Colors } from 'react-native-paper';

export default class ViewEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

    };
  }
  componentDidMount() {
    this.getEvents();
  }

  async getEvents() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    if (data) {
      this.setState({ data });
    }
    
  }

  showList(arr) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => this.props.navigation.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        lastPage: 'ViewEvents'
                                        })}>
      <View style={styles.event} >
        {
          event.slots == 0 ?
          <Text style={styles.title}>{event.name}</Text>
          :
          <Text style={styles.titleOrange}>{event.name}</Text>
        }
        <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
        <Text style={styles.location}>{event.location} at {MilToCil(event.etime)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
        <ProgressBar visible={event.maxslots > 0 ? true : false} progress={event.slots/event.maxslots} color={Colors.orange800} />
      </View>
      </TouchableOpacity>
    })
  }

  render() {
    const {hasNewData} = this.props.route.params;
    if (hasNewData) {
      this.forceUpdate();
    }
    const data = this.state.data;
    return (
      <React.Fragment>

        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          <React.Fragment>
          { //If data then display api otherwise loading indicator
            data ? ( //if data
              <React.Fragment>

                <View style={styles.eventbox}>
                  {data && this.showList(this.state.data)}
                </View>
              </React.Fragment>
              
            )
              : //else 
              (<ActivityIndicator style={{top: '50%'}}/>)
          }
          </React.Fragment>
          
        </ScrollView>
        <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent', {lastPage: 'ViewEvents'})}>
          <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
        </TouchableOpacity>
      </React.Fragment>
    )
  }

}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -3
  },
  createbutton:{
    position: 'fixed',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: '#ff7600',
    margin: 20,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 5,
    right: 10,
    textAlign:'center',
  },
  container: {

  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%',
    position: 'absolute',
    
  },
  calendar: {
    position: 'absolute',
    top: 10,
    right: 10, 
  },
  event: {
    flexDirection: "column",
    //height: 125,
    padding: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 22
  },
  titleOrange: {
    color: '#ff7600',
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

/*
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar', {fromMyEvent: false})} 
          style={{ flex: 1, textAlign: 'right', position: 'absolute', right: 0, top: 0, zIndex: 2}}>
          <View style={{ margin: 12 }}>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 10, backgroundColor: "#fff", padding: 6,  border: '1px solid #ff9900', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}><Ionicons name={"ios-calendar"} size={30} color={"#666"} /></View>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 45, backgroundColor: "#ff9900", padding: 6,  border: '1px solid #ff9900', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}><Ionicons name={"ios-list"} size={30} color={"#fff"} /></View>
          </View>
        </TouchableOpacity>
*/