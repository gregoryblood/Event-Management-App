import React, { Component, useState, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, Platform
} from 'react-native';
import { editEvent } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import { Input } from 'react-native-elements';

export default class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '', 
      name: '',
      description: '',
      location: '',
      eDate: '',
      eTime: '',
      slots: 0,
      maxslots: 0,
    };
  }

  componentDidMount () {
    const {id, name, edate, location, description, etime, slots, maxslots, lastPage} = this.props.route.params;

    this.setState({
      id: id,
      name: name,
      description: description,
      location: location,
      eDate: edate,
      eTime: etime,
      slots: slots,
      maxslots: maxslots,
    });

  }
  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  //Edits an event //addToEvents = async () =>
  editEvent = async () => {
    const { name, description, location, slots } = this.state;
    var { eDate, eTime, maxslots } = this.state;

    //If unaltered date and time, adjust due to formatting
    if (eDate.length == 24)
      eDate = eDate.substr(0, 10);
    if (eTime.length == 8)
      eTime = eTime.substr(0, 5);
    if (maxslots==='') {
      maxslots = 0;
    }
    
    if (String(name).length >= 3
        && String(location).length >= 2
        && String(eDate).length == 10
        && String(eTime).length == 5
        ) 
    {
      //Makes sure date input are all numbers
      if (!(/^\d+$/.test(eDate.substr(5, 2))) || 
          !(/^\d+$/.test(eDate.substr(8, 2))) ||
          !(/^\d+$/.test(eDate.substr(0, 4))))
      {
        alert("Date is invalid");
        return;
      }
      //Gets Date from string after checking ranges and if num
      //(Not perfect for days but that's handled later)
      if (!(parseInt(eDate.substr(5, 2), 10) >= 0 && parseInt(eDate.substr(5, 2), 10) < 13 &&
           parseInt(eDate.substr(8, 2), 10) >= 0 && parseInt(eDate.substr(8, 2), 10) < 32 )) {
        alert("Date Range is Incorrect");
        return;
      }
      const date = eDate.substr(0, 4)+'-'+eDate.substr(5, 2)+'-'+eDate.substr(8, 2)+'T00:00:00.000Z';
      //Makes sure time input are all numbers
      if (!(/^\d+$/.test(eTime.substr(0, 2))) || 
      !(/^\d+$/.test(eTime.substr(3, 2))))
        {
          alert("Time is invalid");
          return;
        }
      //Gets time from string after checking ranges
      if (!(parseInt(eTime.substr(0, 2), 10) >= 0 && parseInt(eTime.substr(0, 2), 10) < 24 &&
          parseInt(eTime.substr(3, 2), 10) >= 0 && parseInt(eTime.substr(3, 2), 10) < 60)) {
        alert("Invalid time of the day");
        return;
      }
      const time = eTime.substr(0, 2) + ':' + eTime.substr(3, 2) + ':' + '00';
      try {
        await editEvent(this.props.route.params.id, name, description, location, date, time, parseInt(slots), parseInt(maxslots));
      }
      catch(e) {
        alert("Invalid day of the month");
        return;
      }
      const {lastPage, id} = this.props.route.params;
      this.props.navigation.navigate(lastPage, {
        id: id,
        name: name,
        edate: eDate,
        location: location,
        description: description,
        etime: eTime,
        slots: slots,
        maxslots: maxslots,
    });
    }
    else {
      alert("Check information again");
    }
  }
  render() {
    const { name, edate, location, description, etime, maxslots, lastPage} = this.props.route.params;

    return (
      <React.Fragment>
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'} /></TouchableOpacity>
        </View>
        <View style={styles.formstyle}>  
          <Input
            placeholder=''
            defaultValue={name}
            onChangeText={this.updateField('name')}
            label="Event Name"
          />
          
          <View style={styles.inline}>
            <Input
              placeholder='HH:MM'
              defaultValue={etime}
              onChangeText={this.updateField('etime')}
              label="Time (24 Hour)"
              maxLength={5}
              containerStyle={styles.formInputTime}
            />

            <Input
              placeholder='YYYY-MM-DD'
              defaultValue={edate.substr(0, 10)}
              onChangeText={this.updateField('edate')}
              label="Date"
              maxLength={10}
              containerStyle={styles.formInputDate}
            />

          </View>
          <Input
            placeholder=''
            defaultValue={location}
            onChangeText={this.updateField('location')}
            label="Location"
          />
          <Input
            placeholder=''
            defaultValue={description}
            onChangeText={this.updateField('description')}
            label="Description"
          />
          <Input
            placeholder='Leave Blank for Unlimited'
            defaultValue={maxslots}
            onChangeText={this.updateField('maxslots')}
            label="Max Attendees"
          />
          <TouchableOpacity onPress={this.editEvent} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" >
            <Text style={styles.finishCreateText}>Save Changes</Text>
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
    fontSize: 30,
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
    fontSize: 18,
    width: '100%',
  },
  formInputTime: {
    width: '50%',
  },
  formInputDate: {
    width: '50%',
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


