import React, { Component, useState, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { addEventToList } from '../Client/API/index.js';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      location: null,
      eDate: null,
      eTime: null,
      slots: null,
      maxslots: null,
    };
  }
  
  showDatePicker = () => {
    showMode('date');
  };

  hideTimePicker = () => {
    showMode('time');
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location, slots, maxslots } = this.state;
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let eDate = date.getFullYear()+'-0'+date.getMonth()+'-0'+date.getDay()+'T00:00:00.000Z'
    let eTime = hours + ':' + minutes + ':' + seconds;
    await addEventToList(name, description, location, eDate, eTime, 0, parseInt(maxslots));
    const {fromMyEvent} = this.props.route.params;
    fromMyEvent ? 
    this.props.navigation.navigate('ViewMyEvents')
    :
    this.props.navigation.navigate('ViewEvents');
  }

  render() {
    const isDatePickerVisible = false;
    return (
      <React.Fragment  >
      <View style={styles.formstyle}>
        <TextInput placeholder='Event Name' onChangeText={this.updateField('name')}
          style={styles.formInput} type="text"></TextInput>
          
        <View style={styles.inline}>
          <TextInput placeholder='Time' onChangeText={this.showTimePicker}
            style={styles.formInputSmall} type="date"></TextInput>

          <TextInput placeholder='Date' onChangeText={this.showDatePicker}
            style={styles.formInputSmall} type="time"></TextInput>

        </View>

        <TextInput placeholder='Description' onChangeText={this.updateField('description')}
          style={styles.formInput} type="text"></TextInput>
        <TextInput placeholder='Location' onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"></TextInput>
        
        <TextInput placeholder='Maximum Attendance' onChangeText={this.updateField('maxslots')}
          style={styles.formInput} type="text"></TextInput>
        
        <TouchableOpacity onPress={this.addToEvents} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" >
          <Text style={styles.finishCreateText}>Publish</Text>
        </TouchableOpacity>

      </View>
    </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  formstyle: {
    flex: 1,
    alignItems: 'center',
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },

  formInput:{
    paddingLeft: 10,
    marginBottom: 20,
    borderStyle: 'solid',
    height: 60,
    borderBottomWidth: 4,
    borderColor: 'orange',
    fontSize: 35,
    width: '100%',
  },
  inline: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  formInputSmall: {
    marginBottom: 20,
    paddingLeft: 10,
    borderStyle: 'solid',
    height: 60,
    borderBottomWidth: 4,
    borderColor: 'orange',
    fontSize: 35,
    width: '36.80vw',
  },
  finishCreateButton: {
    backgroundColor: 'orange',
    borderRadius: 16,
    width: '100%',
  },
  finishCreateText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    height: 20,
    paddingTop: 20,
    paddingBottom: 70,
    width: '100%',
  },
  
});


