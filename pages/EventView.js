import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import {  addAttendee, getAEvent, removeAttendee, removeEvent } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import {MilToCil} from './HelperFuncs'

export default class EventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      signedup:[],
      data: null,
      eventList: 0,
      issignedup: false,
      hasNewData: false,
      slots: 0,
    };
    this.delFun = this.delFun.bind(this);
    this.syncFun = this.syncFun.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }
  componentDidMount() {
    const { signedup } = this.props.route.params;
    //If users have signed up
    if (signedup) {
      this.setState({
        signedup: [...signedup]
      });
      //Check to see if user is on event list
      let isHave = false;
      if(signedup && signedup.length && Array.isArray(signedup)){
        signedup.forEach(element => {
          if(element.email == global.user.email && element.name == global.user.displayName){
            isHave = true;
          }
        });
      }
      if (isHave) {
        this.setState({issignedup: true});
      }

    }

    this.setState({
      slots: this.props.route.params.slots
    });

    //Remove later
    if (this.props.route.params.slots > 0) {
      this.setState({
        issignedup: true
      });
    }
    
  }
  addToList(id, maxslots){
    if(this.state.slots != maxslots){
      const signedupData =  [...this.state.signedup];
      signedupData.push({email:gUser.email, name:gUser.onid});
      addAttendee(id, gUser.email, gUser.onid, this.state.signedup? [...this.state.signedup]:[]);
      this.setState({
        issignedup: true,
        signedup:signedupData,
        slots: this.state.slots+1
      });
    }
  }
  unAddToList(id) {
    const signedupData =  [...this.state.signedup];
    signedupData.push({email:gUser.email, name:gUser.onid});
    removeAttendee(id, gUser.email, gUser.onid, this.state.signedup? [...this.state.signedup]:[]);
    this.setState({
      slots: this.state.slots-1, 
      signedup:signedupData,
      issignedup: false
    });
  }
  //Sync the user's calendar
  syncFun() {
    //Calendar part
  }
  //Delete the event being viewed
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
  openMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }
  render() {
    const {id, name, edate, location, description, etime, maxslots, slots, lastPage, owned} = this.props.route.params;
    return (
      <View style ={styles.containter}>
        {this.state.menu ? 
        <View style = {styles.signSheet}>
          <TouchableOpacity style = {styles.optionContainerTop} onPress={this.syncFun}><Text style = {styles.syncCalendar}>Sync Calendar <Feather name={"check-circle"} size = {40} /></Text></TouchableOpacity>
          <TouchableOpacity style = {styles.optionContainerBottom} onPress={this.delFun}><Text style = {styles.deleteEvent}>Delete Event <Feather name={"trash"} size = {40} /></Text></TouchableOpacity>
        </View>
        :
        <View/>
        }
        <View style ={styles.displayCard}>
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'} /></TouchableOpacity>
          <TouchableOpacity style = {styles.optionBox} onPress={this.openMenu}><Feather name={"more-vertical"} size={42} color={'gray'} /></TouchableOpacity>
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
        {owned ? 
          <TouchableOpacity style={styles.editbutton} title="Edit Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('EditEvent', 
              {
                lastPage: 'EventView', 
                id: id,
                name: name,
                edate: edate,
                location: location,
                description: description,
                etime: etime,
                slots: slots,
                maxslots: maxslots,
              }
            )}>
            <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
          </TouchableOpacity>
          :
          this.state.issignedup ? 
          <TouchableOpacity onPress={() => this.unAddToList(id)} style={styles.signedupButton} color = '#ff9900' title="Submit Event" >
            <Text style={styles.signedupText}>Leave</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => this.addToList(id, maxslots)} style={styles.signUpButton} color = '#ff9900' title="Submit Event" >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity> 
        }
        </View>  
      </View>
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
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  editbutton:{
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: '#ff7600',
    margin: 0,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 5,
    right: 10,
    textAlign:'center',
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
  signedupButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: '#ff7600',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff7600',
    width: '100%',
  },
  signedupText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    height: 20,
    paddingTop: 20,
    paddingBottom: 70,
    width: '100%',
  },


});