import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import {  addAttendee, getWithSlots, removeAttendee, removeEvent } from '../Client/API/index.js';
import { Icon } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class EventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
      doSign: 1,
      isSignedUp: false,
      hasNewData: false,
    };
    this.syncFun = this.syncFun.bind(this);
    this.delFun = this.delFun.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signDown = this.signDown.bind(this);
  }

  componentDidMount() {
    const {slots} = this.props.route.params;
    if (slots > 0) {
      this.setState({isSignedUp: true});
    }
  }
  addToList(id, slots, maxslots){
    //Method will change once login is implemented
    if((slots + 1) != maxslots){
      addAttendee(id);
      this.setState({isSignedUp: true});
    }

  }
  unAddToList(id) {
    removeAttendee(id);
    this.setState({isSignedUp: false});
  }

  signUp(){
    if(this.state.doSign == 1){
      this.setState({
        doSign: 0,
        hasNewData: true,
      })
      this.forceUpdate();
    }
    else{
      this.setState({
        doSign: 1,
        hasNewData: true,
      })
      this.forceUpdate();
    }
  }
  signDown(){
    this.setState({
      doSign: 1
    });
  }

  syncFun(){
    this.signUp();
  }

  delFun(){
    const {id} = this.props.route.params;
    removeEvent(id);
    this.signUp();
  }

  signForm(){
    if(this.state.doSign == 0) return(
      <View style = {styles.signSheet}>
      <TouchableOpacity style = {styles.optionContainer} onPress={this.syncFun}><Text style = {styles.syncCalendar}>Sync Calendar <Ionicons name={"md-checkmark"} size = {40} /></Text></TouchableOpacity>
      <TouchableOpacity style = {styles.optionContainer} onPress={this.delFun}><Text style = {styles.deleteEvent}>Delete Event <Ionicons name={"md-close"} size = {40} /></Text></TouchableOpacity>
      </View>
    );

    //<TouchableOpacity onPress = {this.signDown}><Ionicons style = {styles.signSheetClose} name = {"ios-close"}/></TouchableOpacity>
    //<Text style = {styles.syncDesc}>You may sync this event to your personal calendar on your mobile device. Tap the button to your calendar.</Text>
    //<View style = {styles.syncHolder}><Button title = 'Sync Calednar' color = 'orange'></Button></View>
  }

  render() {
      const {id, name, edate, location, description, etime, slots, maxslots, fromMyEvent} = this.props.route.params;
    return (
      <View style ={styles.containter}>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => fromMyEvent ? this.props.navigation.navigate('ViewMyEvents') : this.props.navigation.navigate('ViewEvents')}><Ionicons name={"ios-arrow-back"} size={42} color={'gray'} /></TouchableOpacity>
          <TouchableOpacity style = {styles.optionBox} onPress={this.signUp}><Ionicons name={"md-more"} size={42} color={'gray'} /></TouchableOpacity>
        </View>
        <Text style = {styles.cardTitle}>{name}</Text>
        <Text style = {styles.cardWhenWhere}>{edate.slice(0, 10) }</Text>
        <Text style = {styles.cardWhenWhere}>{location} at {etime.slice(0,5)}</Text>
        {
          maxslots > 0 ?
          <Text style = {styles.cardWhenWhere}>{slots}/{maxslots} spots available</Text>
          :
          <Text style = {styles.cardWhenWhere}></Text>
        }
        <Text style = {styles.cardDescription}>{description}</Text>
        {this.state.isSignedUp ? 
        <TouchableOpacity onPress={() => this.unAddToList(id)} style={styles.signedUpButton} color = '#ff9900' title="Submit Event" >
          <Text style={styles.signedUpText}>Leave</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => this.addToList(id, slots, maxslots)} style={styles.signUpButton} color = '#ff9900' title="Submit Event" >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity> 
        }
        
        </View>  
      </View>
    )
  }

}
const styles = StyleSheet.create({
  syncDesc:{
    fontSize: 30,
    textAlign: 'center',
  },
  viewBar:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  containter: {
    padding: '4%',
    position: 'fixed',
    zIndex: '0',
    width: '100%',
    height:'100%',
  },
  syncHolder:{
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    widht: '80%',
    marginTop: 'auto',
    marginBottom: 10,
    marginRight: 3,
    marginLeft: 3,
  },

  backBox:{
    fontSize: 40,
    color: 'darkgrey',
    width: 45,

  },

  signSheetClose:{
    color: 'black',
    fontSize: 25,
    textAlign: 'right',
    marginTop: 5,
    marginRight: 5,
  },

  signSheetText:{
    fontSize: 25,
    marginTop: 25,
    marginLeft: 3,
    marginRight: 3,
    textAlign: 'center',
    
  },

  syncCalendar:{
    color: 'lime',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 3,
  },

  deleteEvent:{
    color: 'tomato',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 3,
  },

  optionContainer:{
    paddingTop: 10,
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    display: 'inline',
  },

  signSheet:{
    position: 'fixed',
    height: 'auto',
    top: '5%',
    left: '20%',
    right: '15%',
    zIndex: 2,
    backgroundColor: 'offwhite',
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 3,
    
  },

  optionBox:{
    alignSelf: 'flex-end',
    margin: 0,
    zIndex: 1,
    paddingRight: 20, 
    paddingLeft: 20, 
    
  },
  cardElement:{
    marginLeft: '5%',
    marginRight: '5%',

  },
  cardWhenWhere:{
    color: 'grey',
    textAlign: 'left',
    fontSize: 25,
  },
  displayCard:{
    width: '100%',
    height: '100%',
    paddingBottom: 80,
  }, 
  cardText:{
    fontSize: 25,
    textAlign: 'left',
  },
  cardDescription:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 25,

  },
  cardTitle:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 45,

  },

  signUpButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
  signUpText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    height: 20,
    paddingTop: 20,
    paddingBottom: 70,
    width: '100%',
  },
  signedUpButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'orange',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'orange',
    width: '100%',
  },
  signedUpText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    height: 20,
    paddingTop: 20,
    paddingBottom: 70,
    width: '100%',
  },


});