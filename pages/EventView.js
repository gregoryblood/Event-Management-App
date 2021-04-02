import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import {  addAttendee, getWithSlots, removeAttendee, removeEvent } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import {MilToCil} from './HelperFuncs'

export default class EventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
      doSign: 1,
      isSignedUp: false,
      hasNewData: false,
      slots: 0,
    };
    this.syncFun = this.syncFun.bind(this);
    this.delFun = this.delFun.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signDown = this.signDown.bind(this);
  }

  componentDidMount() {

    const {slots} = this.props.route.params;
    this.setState({slots: slots});
    if (slots > 0) {
      this.setState({isSignedUp: true});
    }
  }
  
  addToList(id, slots, maxslots){
    //Method will change once login is implemented
    if(slots != maxslots){
      addAttendee(id);
      this.setState({isSignedUp: true});
      this.setState({slots: slots+1});
    }

  }
  unAddToList(id) {
    removeAttendee(id);
    this.setState({slots: this.state.slots-1});
    this.setState({isSignedUp: false});
  }

  signUp(){
    if(this.state.doSign == 1){
      this.setState({
        doSign: 0,
      })
    }
    else{
      this.setState({
        doSign: 1,
      })

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
    if (confirm("Are you sure you want to delete this event?\n\nYou will not be able to recover it...")) {
      const {id, lastPage} = this.props.route.params;
      removeEvent(id);
      this.props.navigation.navigate(lastPage);
    }
    
  }

  signForm(){
    if(this.state.doSign == 0) return(
      <View style = {styles.signSheet}>
        <TouchableOpacity style = {styles.optionContainerTop} onPress={this.syncFun}><Text style = {styles.syncCalendar}>Sync Calendar <Feather name={"check-circle"} size = {40} /></Text></TouchableOpacity>
        <TouchableOpacity style = {styles.optionContainerBottom} onPress={this.delFun}><Text style = {styles.deleteEvent}>Delete Event <Feather name={"trash"} size = {40} /></Text></TouchableOpacity>
      </View>
    );
  }
  
  render() {
      const {id, name, edate, location, description, etime, maxslots, lastPage} = this.props.route.params;
    return (
      <View style ={styles.containter}>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'} /></TouchableOpacity>
          <TouchableOpacity style = {styles.optionBox} onPress={this.signUp}><Feather name={"more-vertical"} size={42} color={'gray'} /></TouchableOpacity>
        </View>
        <Text style = {styles.cardTitle}>{name}</Text>
        <Text style = {styles.cardWhenWhere}>{edate.slice(0, 10) }</Text>
        <Text style = {styles.cardWhenWhere}>{location} at { MilToCil(etime) }</Text>
        {
          maxslots > 0 ?
          <Text style = {styles.cardWhenWhere}>{this.state.slots}/{maxslots} spots available</Text>
          :
          <Text style = {styles.cardWhenWhere}></Text>
        }
        <Text style = {styles.cardDescription}>{description}</Text>
        {this.state.isSignedUp ? 
        <TouchableOpacity onPress={() => this.unAddToList(id)} style={styles.signedUpButton} color = '#ff9900' title="Submit Event" >
          <Text style={styles.signedUpText}>Leave</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => this.addToList(id, this.state.slots, maxslots)} style={styles.signUpButton} color = '#ff9900' title="Submit Event" >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity> 
        }
        
        </View>  
      </View>
    )
  }

}
const styles = StyleSheet.create({

  viewBar:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  containter: {
    padding: 20,
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height:'100%',
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
    width: 800,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    display: 'none',
    
  },
  optionContainerTop:{
    padding: 10,
    paddingTop: 5,
    height: 80,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16, 
    width: '100%',
    textAlign: 'center'
  },
  optionContainerBottom:{
    padding: 10,
    paddingTop: 5,
    height: 80,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16, 
    width: '100%',
    textAlign: 'center'
  },

  signSheet:{
    position: 'absolute',
    height: 'auto',
    top: 80,
    right: 30,
    width: 350,
    zIndex: 2,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 16,
    
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
    fontSize: 16,
    textAlign: 'left',
  },
  cardDescription:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 20,

  },
  cardTitle:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 26,

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
    backgroundColor: '#ff7600',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff7600',
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