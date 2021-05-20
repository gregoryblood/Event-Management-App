import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent, searchEvents } from '../Client/API/index.js';
import { EventList} from './Components/EventList';
import {Feather} from '@expo/vector-icons';
import {SearchBar} from 'react-native-elements';

export default class ViewEventsWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search: '',
    };
  }
  componentDidMount() {
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
  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          <React.Fragment>
          { //If data then display api otherwise loading indicator
            data ? //if data
              <React.Fragment>
                <View style={styles.eventbox}>
                  {data && EventList(this.props.navigation, 'ViewEventsWithSearch', this.state.data, true)}
                </View>
              </React.Fragment>
              : //else 
              (<ActivityIndicator style={{top: '50%'}}/>)
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
          gUser.type !== 'Student' &&
          <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent', {lastPage: 'ViewEventsWithSearch'})}>
            <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
          </TouchableOpacity>
        }

      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  container: {

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
    borderColor: 'white',
  },
  searchbarcontainer: {
    backgroundColor: 'white',
    borderColor: 'white'
  },
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
    bottom: 18,
    right: 10,
    textAlign:'center',
  },
});