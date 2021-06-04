import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent,addEventToList } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import { EventList } from './Components/EventList';

export default class ViewEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
        //This will update when naved back to
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getEvents();
        });
        return () => {
          // Clear setInterval in case of screen unmount
          clearTimeout(interval);
          // Unsubscribe for the focus Listener
          unsubscribe;
        };
  }

  async getEvents() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    if (data) {
      this.setState({ data });
    }
  }

  render() {
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
                  {data && EventList(this.props.navigation, 'ViewEvents', this.state.data, true)}
                </View>
              </React.Fragment>
            )
              : //else 
              (<ActivityIndicator style={{ top: '50%'}}/>)
          }
          </React.Fragment>
        </ScrollView>
        {
          gUser.type !== 'Student' &&
          <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent', {lastPage: 'ViewEvents'})}>
            <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
          </TouchableOpacity>
        }
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
    backgroundColor: '#D73F09',
    margin: 20,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 35,
    right: 10,
    textAlign:'center',
  },

  eventbox: {
    flexDirection: "column",
    //paddingTop: 30,
    flex: 1,
    width: '100%',
    position: 'absolute',
    
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