import React, { Component, useState, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, Platform
} from 'react-native';
import moment, { min } from 'moment';
import { addEventToList } from '../Client/API/index.js';
import {DateTimePick} from './DateTimePick'



export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      location: '',
      eDate: new Date(),
      eTime: '',
      slots: 0,
      maxslots: 0,
    };
  }

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location, maxslots } = this.state;
    if (String(name).length > 3
        && String(description).length > 3
        && String(location).length > 3
        //&& String(date).length > 3
        //&& String(time).length > 3
        ) {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      const eDate = date.getFullYear()+'-'+('0'+ (date.getMonth() + 1)).slice(-2)+'-'+('0'+ (date.getDate())).slice(-2)+'T00:00:00.000Z'
      let eTime = hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
      await addEventToList(name, description, location, eDate, eTime, 0, parseInt(maxslots));
      const {lastPage} = this.props.route.params;
      this.props.navigation.navigate(lastPage);
    }
    else {
      alert("Not enough information")
    }
  }
  render() {
    return (
      <React.Fragment  >
      <View style={styles.formstyle}>
        <TextInput placeholder='Event Name' onChangeText={this.updateField('name')}
          style={styles.formInput} type="text"/>
          
        <View style={styles.inline}>
          {//<DateTimePick/>
          }
          <TouchableOpacity onPress={console.log("Pressed Time")}
            style={styles.formInputTime} type="Time">
              <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={console.log("Pressed Date")}
            style={styles.formInputDate} type="Date">
            <Text style={styles.buttonText}>Date</Text>
          </TouchableOpacity>

        </View>
        <TextInput placeholder='Location' onChangeText={this.updateField('location')}
          style={styles.formInput} type="text"/>
        <TextInput multiline allowFontScaling
        numberOfLines={3} editable maxLength={300} placeholder='Description' onChangeText={this.updateField('description')}
          style={styles.formInputDescription} type="text"/>
        
        
        <TextInput placeholder='Max Slots' onChangeText={this.updateField('maxslots')}
          style={styles.formInput} type="text"/>
        
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
    borderWidth: 1,
    borderRadius: 10, 
    borderColor: 'gray',
    fontSize: 35,
    width: '100%',
  },
  inline: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
  },
  formInputDescription: {
    paddingLeft: 10,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10, 
    borderColor: 'gray',
    fontSize: 20,
    width: '100%',
    
  },
  formInputTime: {
    marginBottom: 20,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10, 
    borderColor: 'gray',
    fontSize: 35,
    height: 50, 
    width: '45%',
  },
  formInputDate: {
    marginBottom: 20,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10, 
    borderColor: 'gray',
    fontSize: 35,
    height: 50,
    marginLeft: 'auto',
    width: '45%',
  },
  buttonText: {
    fontSize: 35,
    color: 'grey',
  },

  finishCreateButton: {
    backgroundColor: '#ff7600',
    borderRadius: 12,
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


