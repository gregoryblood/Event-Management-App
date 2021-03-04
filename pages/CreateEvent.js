import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { addEventToList } from '../Client/API/index.js';




export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,

    };
  }

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }



  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location } = this.state;
    const eDate = new Date();
    await addEventToList(name, description, location,moment(eDate).format('YYYY-MM-DD'),moment(eDate).format('HH:mm:ss'), 0, 0);
    this.getEvent();
    this.onCreatePress(0);
  }

  render() {
    return (
      <React.Fragment>
      <form>
        <Text style={styles.formLabel}>Event Name</Text>
        <TextInput onChangeText={this.updateField('name')}
          style={styles.formInput} type="text"></TextInput><br></br>
        <Text style={styles.formLabel}>Event Description</Text>
        <TextInput onChangeText={this.updateField('description')}
          style={styles.formInput} type="text"></TextInput><br></br>
        <Text style={styles.formLabel}>Event Location</Text>
        <TextInput onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Time</Text>
          
        <TextInput onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Date</Text>
        <TextInput onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"></TextInput><br></br>
      </form>
      <Button onPress={this.addToEvents} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" ></Button>
    </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  
  formLabel:{
    marginLeft: '5%',
    fontSize: 35,
  },

  formInput:{
    margin: 20,
    borderStyle: 'solid',
    height: '40px',
    borderWidth: 1,
    borderRadius: '8px',
    borderColor: 'black',
  },
  finishCreateButton: {
    position: 'fixed',
    bottom: 45,
    padding: 50,
    paddingLeft: '10%',
    paddingRight: '10%',
    borderRadius: '16px',
    width: '100%',
  },
  
});


