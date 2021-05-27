import React, { Component } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent, getMyEvents, getMyOwnedEvents, searchEvents } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import { EventList } from './Components/EventList';
import {SearchBar} from 'react-native-elements';

export default class ViewMyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      readyToLoad: false,
      search: '',
    };
  }
  componentDidMount() {
    this.getMyEvents();
    //This will update when naved back to
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getEvent(); 
    });
    return () => {
      // Clear setInterval in case of screen unmount
      clearTimeout(interval);
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }
  updateField = (field) => (text) => {
    text = text.replace(/\W/g, ''); //Strips all non letter/number characters
    if (text != this.state.search) {
      this.setState({ [field]: text }, () => {
        if (this.state.search != '') {
          //console.log(this.state.search);
          this.searchEvents();
        }
        else {
          this.getEvent();
        }
      });
    }
  }
  async getEvent() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    this.setState({ data });
  }
  async searchEvents() {
    const { data } = await searchEvents(this.state.search.toUpperCase());
    if (data) {
      this.setState({ data: data });
    }
  }
  async getMyEvents() {
    var {data} = await getMyEvents(gUser.email);
    const owned = (await getMyOwnedEvents(gUser.email)).data;
    owned.forEach(e => {
      data.push({eventsid: e.id});
    });
    
    gUser.events = Object.values(data);
    this.setState({readyToLoad: true});
  }
  render() {
    //To prevent gUser.events being empty
    const readyToLoad = this.state.readyToLoad; 
    return (
      <React.Fragment>

        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          <React.Fragment>
          { //If data then display api otherwise loading indicator
            readyToLoad ? ( //if data
              <React.Fragment>
                <View style={styles.eventbox}>
                  {readyToLoad && EventList(this.props.navigation, 'ViewMyEvents', this.state.data, false)}
                </View>
              </React.Fragment>
            )
              : //else 
              (<ActivityIndicator style={{ top: '50%'}}/>)
          }
          </React.Fragment>
        </ScrollView>
        <SearchBar placeholder= "Search Here..."
          onChangeText={this.updateField('search')}
          value={this.state.search}
          lightTheme={true}
          style={styles.searchbar}
          inputContainerStyle={styles.searchbarcontainer}
          containerStyle={{backgroundColor: 'white'}}
        />
        {
          gUser.type !== 'Student' ? 
          <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent', {lastPage: 'ViewMyEvents'})}>
            <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
          </TouchableOpacity>
          :
          <View/>
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
    bottom: 18,
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
  searchbar: {
    backgroundColor: 'white',
    borderColor: 'white'
  },
  searchbarcontainer: {
    backgroundColor: 'white',
    borderColor: 'white'
  }
});

/*
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar', {fromMyEvent: true})} 
          style={{ flex: 1, textAlign: 'right', position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
            <View style={{ margin: 12 }}>
              <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 10, backgroundColor: "#fff", padding: 6,  border: '1px solid #ff9900', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}><Ionicons name={"ios-calendar"} size={30} color={"#666"} /></View>
              <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 45, backgroundColor: "#ff9900", padding: 6,  border: '1px solid #ff9900', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}><Ionicons name={"ios-list"} size={30} color={"#fff"} /></View>
            </View>
        </TouchableOpacity>
*/