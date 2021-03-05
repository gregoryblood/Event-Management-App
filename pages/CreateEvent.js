import React, { Component, useState, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { addEventToList } from '../Client/API/index.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      location: null,
      edate: null,
      etime: null,
      slots: null,
      maxslots: null,
    };
  }
  
  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
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
    const { name, description, location, edate, etime, slots, maxslots } = this.state;
    const eDate = new Date();
    await addEventToList(name, description, location, moment(eDate).format('YYYY-MM-DD'),moment(eDate).format('HH:mm:ss'), slots, maxslots);
    this.props.navigation.navigator('ViewEvents');
  }

  render() {
    const isDatePickerVisible = false;
    return (
      <React.Fragment  >
      <View style={styles.formstyle}>
        <TextInput placeholder='Event Name' onChangeText={this.updateField('name')}
          style={styles.formInput} type="text"></TextInput><br></br>
          
        <View style={styles.inline}>
          <TextInput placeholder='Time' onChangeText={this.showDatePicker}
            style={styles.formInputSmall} type="text"></TextInput><br></br>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />  
          <TextInput placeholder='Date' onChangeText={this.showDatePicker}
            style={styles.formInputSmall} type="text"></TextInput><br></br>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />  
        </View>
        
        <TextInput placeholder='Description' onChangeText={this.updateField('description')}
          style={styles.formInput} type="text"></TextInput><br></br>
        <TextInput placeholder='Location' onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"></TextInput><br></br>
        
        <TextInput placeholder='Slots' onChangeText={this.updateField('maxslots')}
          style={styles.formInput} type="text"></TextInput><br></br>
        
        <TouchableOpacity onPress={this.addToEvents} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" >Create</TouchableOpacity>

      </View>
    </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  formstyle: {
    flex: 1,
    alignItems: 'center',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },

  formInput:{
    paddingLeft: 10,
    marginBottom: 20,
    borderStyle: 'solid',
    height: '60px',
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
    height: '60px',
    borderBottomWidth: 4,
    borderColor: 'orange',
    fontSize: 35,
    width: '50%',
  },
  finishCreateButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    height: 20,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: 'orange',
    borderRadius: '16px',
    width: '100%',
  },
  
});


