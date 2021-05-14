import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent, searchEvents } from '../Client/API/index.js';
import { EventList} from './Components/EventList';

export default class ViewEventsWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search: null,
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
        <TextInput style={styles.searchbar} onChangeText={this.updateField('search')} placeholder={'Search'}></TextInput>
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
    padding: 30,
    fontSize: 30,
    borderTopWidth: 1,
    borderColor: 'gray'
  }
});