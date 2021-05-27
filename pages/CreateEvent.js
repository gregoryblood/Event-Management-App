import React, { Component, useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { addEventToList } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import { Input } from 'react-native-elements';


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
      maxslots: 0,
      author: "default",
      lastPage: null
    };
  }

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }
  componentDidMount() {
    //This will update when naved back to
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(this.props.route.params.lastPage);
      this.setState({
        lastPage: this.props.route.params.lastPage
      })
    });
    return () => {
      // Clear setInterval in case of screen unmount
      clearTimeout(interval);
      // Unsubscribe for the focus Listener
      unsubscribe;
    };

  }
  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location, eDate, eTime } = this.state;
    var {maxslots} = this.state;
    if (maxslots==='') {
      maxslots = 0;
    }
    if (String(name).length >= 3
        && String(eDate).length == 10
        && String(eTime).length == 5
        && parseInt(maxslots) >= 0 
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
      var data;
      try {
        data = await addEventToList(name, description, location, date, time, 0, parseInt(maxslots), gUser.email);
      }
      catch(e) {
        alert("Invalid day of the month");
        return;
      }
      //Add new event to user's owned events
      const obj = JSON.parse(data.config.data);
      if (data)
        gUser.events.push({eventsid: obj.id});
      //Navigate back
      const {lastPage} = this.props.route.params;
      this.props.navigation.navigate(lastPage);
    }
    else {
      alert("Check information again");
    }
  }
  render() {
    const {
      width: SCREEN_WIDTH,
    } = Dimensions.get('window');
    var fontSize = 15;
    if (SCREEN_WIDTH > 400) {
      fontSize = 26;
    }
    return (
      <React.Fragment  >
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(this.state.lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'}/></TouchableOpacity>
        </View>
        <View style={styles.formstyle}>
        <Input
            placeholder='Event Name'
            onChangeText={this.updateField('name')}
            style={{fontSize: fontSize}}
          />
          
          <View style={styles.inline}>
            <Input
              placeholder='HH:MM'
              onChangeText={this.updateField('eTime')}
              label="Time (24 Hr)"
              maxLength={5}
              containerStyle={styles.formInputTime}
              style={{fontSize: fontSize}}
              labelStyle={{fontSize: fontSize/1.5}}
              />

            <Input
              placeholder='YYYY-MM-DD'
              onChangeText={this.updateField('eDate')}
              label="Date"
              maxLength={10}
              containerStyle={styles.formInputDate}
              style={{fontSize: fontSize}}
              labelStyle={{fontSize: fontSize/1.5}}
              />

          </View>
          <Input
            adjustsFontSizeToFit 
            placeholder='Location'
            onChangeText={this.updateField('location')}
            style={{fontSize: fontSize}}
          />
          <Input
            placeholder='Description'
            onChangeText={this.updateField('description')}
            style={{fontSize: fontSize}}
          />
          <Input
            placeholder='Leave Blank for Unlimited'
            onChangeText={this.updateField('maxslots')}
            label="Max Attendees"
            style={{fontSize: fontSize}}
            labelStyle={{fontSize: fontSize/1.5}}
          />
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
    width: '90%',
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
    fontSize: 30,
    color: 'grey',
  },

  finishCreateButton: {
    backgroundColor: '#D73F09',
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


