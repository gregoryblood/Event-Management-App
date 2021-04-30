import React, { Component, useState, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, Platform
} from 'react-native';
import moment, { min } from 'moment';
import { addEventToList } from '../Client/API/index.js';
import {DateTimePick} from './DateTimePick'
import {Feather} from '@expo/vector-icons';


export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      location: '',
      eDate: '',
      eTime: '',
      slots: 0,
      maxslots: '',
      author: "default",
    };
  }

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    if (gUser.type === 'student')
      return;
    const { name, description, location, maxslots, eDate, eTime } = this.state;
    if (String(name).length >= 3
        && String(location).length >= 3
        && String(eDate).length == 10
        && String(eTime).length == 5
        && maxslots.valueOf() >= 0
        ) 
    {
      //Gets Date from string after checking ranges (Not perfect for days)
      if (eDate.substr(5, 2).valueOf() > 12 || eDate.substr(8, 2).valueOf() > 31) {
        alert("Date Range is Incorrect");
        return;
      }
      const date = eDate.substr(0, 4)+'-'+eDate.substr(5, 2)+'-'+eDate.substr(8, 2)+'T00:00:00.000Z';
      //Gets time from string after checking ranges
      if (eTime.substr(0, 2).valueOf() > 23 || eTime.substr(3, 2).valueOf() > 59) {
        alert("Invalid time of the day");
        return;
      }
      const time = eTime.substr(0, 2) + ':' + eTime.substr(3, 2) + ':' + '00';
      try {
        await addEventToList(name, description, location, date, time, 0, parseInt(maxslots), gUser.email);
      }
      catch(e) {
        alert("Invalid day of the month");
        return;
      }
      const {lastPage} = this.props.route.params;
      this.props.navigation.navigate(lastPage);
    }
    else {
      alert("Check information again");
    }
  }
  render() {
    return (
      <React.Fragment  >
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(this.props.route.params.lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'} /></TouchableOpacity>
        </View>
        <View style={styles.formstyle}>
          <TextInput placeholder='Event Name' onChangeText={this.updateField('name')}
            style={styles.formInput} type="text"/>
            
          <View style={styles.inline}>
            {//<DateTimePick/>
            }
            <TextInput placeholder='HH:MM' onChangeText={this.updateField('eTime')}
              style={styles.formInputTime} maxLength={5}>
            </TextInput>

            <TextInput placeholder='YYYY-MM-DD' onChangeText={this.updateField('eDate')}
              style={styles.formInputDate} maxLength={10}>
            </TextInput>

          </View>
          <TextInput placeholder='Location' onChangeText={this.updateField('location')}
            style={styles.formInput} type="text"/>
          <TextInput multiline allowFontScaling
          numberOfLines={3} editable maxLength={300} placeholder='Description' onChangeText={this.updateField('description')}
            style={styles.formInputDescription} type="text"/>
          
          
          <TextInput placeholder='Max Slots' onChangeText={this.updateField('maxslots')}
            style={styles.formInput} type="text" allowFontScaling={10}/>
          
          <TouchableOpacity onPress={this.addToEvents} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" >
            <Text style={styles.finishCreateText}>Publish</Text>
          </TouchableOpacity>

        </View>
      </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -3
  },
  viewBar:{
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
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


