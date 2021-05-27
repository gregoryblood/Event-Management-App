import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import {  addAttendee,removeAttendee, removeEvent, getAttendee } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import {MilToCil} from './HelperFuncs';

import { firebase } from '@firebase/app'
import 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
const {
  width: SCREEN_WIDTH,
} = Dimensions.get('window');
var fontSize = 20;
if (SCREEN_WIDTH > 400) {
  fontSize = 36;
}
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
    this.signOut = this.signOut.bind(this);
    this.syncFun = this.syncFun.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }
  componentDidMount() {
    
    const { id } = this.props.route.params;
    this.getList(id);
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

  async getList(id){
    const {data} = await getAttendee(id);
    this.setState({
      signedup:data
    });
  }

 async addToList(id, maxslots){
    if(this.state.slots != maxslots){
      this.setState({
        issignedup: true,
        slots: this.state.slots+1
      });
      const email = gUser.email, onid = gUser.onid;
      gUser.events.push({eventsid: id, email, onid});
      await  addAttendee(id, email, onid);
      await this.getList(id);
    }
  }
 async unAddToList(id) {
    this.setState({
      slots: this.state.slots-1, 
      issignedup: false
    });
    const email = gUser.email, onid = gUser.onid;
    const i = gUser.events.findIndex( element => element.eventsid == id);
    gUser.events.splice(i, 1);
    await removeAttendee(id, email, onid);

    await this.getList(id);
  }
  showAttendees() {
    const data = this.state.signedup;
    if (data[0]) {
      var items = [];
      data.forEach(element => {
        items.push(
        <Text style={styles.studentsSignedUp} key={element.email}>
          {element.email}
        </Text>);
      });
      return items;
    }
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
  //Signs user out 
  signOut() {
    firebase.auth().signOut().then(() => {
      window.location.href = '/';
    }).catch((error) => {
      alert("Could not sign out");
    });
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
      <View style={styles.container}>
        {this.state.menu && 
          <View style = {styles.signSheet}>
            <TouchableOpacity style = {styles.optionContainerTop} onPress={this.syncFun}><Text style = {styles.syncCalendar}>Sync Calendar <Feather name={"check-circle"} size = {40} /></Text></TouchableOpacity>
            {owned && 
              <TouchableOpacity style = {styles.optionContainer} onPress={this.delFun}><Text style = {styles.deleteEvent}>Delete Event <Feather name={"trash"} size = {40} /></Text></TouchableOpacity>
            }
            <TouchableOpacity style = {styles.optionContainerBottom} onPress={this.signOut}><Text style = {styles.logout}>Sign Out <Feather name={"log-out"} size = {40} /></Text></TouchableOpacity>
          </View>
        }
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => this.props.navigation.navigate(lastPage)}><Feather name={"arrow-left"} size={42} color={'gray'} /></TouchableOpacity>
          <TouchableOpacity style = {styles.optionBox} onPress={this.openMenu}><Feather name={"more-vertical"} size={42} color={'gray'} /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          <View style ={styles.displayCard}>
            <Text style = {styles.cardTitle}>{name}</Text>
            <Text style = {styles.cardWhenWhere}>{edate.slice(0, 10) }</Text>
            <Text style = {styles.cardWhenWhere}>{location} at { MilToCil(etime) }</Text>
            {
              maxslots > 0 &&
              <Text style = {styles.cardWhenWhere}>{this.state.slots}/{maxslots} spots available</Text>
            }
            <Text style = {styles.cardDescription}>{description}</Text>
            {owned && <Text style={styles.studentsSignedUpHeader}>Students Signed Up</Text>}
            {owned && this.showAttendees()}
          </View>  
        </ScrollView>
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
            <Feather style={styles.icon} name={'edit-3'} size={35} color={'white'} />
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
    )
  }

}
const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -3
  },
  viewBar:{
    //paddingTop: 25,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  editbutton:{
    position: 'fixed',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: '#D73F09',
    margin: 0,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 18,
    right: 10,
    textAlign:'center',
  },

  container: {
    padding: 20,
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    
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
    color: 'gray',
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

  logout:{
    color: 'orange',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 3,
  },

  optionContainer:{
    padding: 10,
    paddingTop: 5,
    height: 80,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center'
    
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
    top: 90,
    right: 20,
    width: '100%',
    maxWidth: 350,
    zIndex: 2,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 16,
  },

  optionBox:{
    alignSelf: 'flex-end',
    margin: 0,
    marginRight: -20,
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
    fontSize: fontSize/1.2,
    
  },
  displayCard:{
    width: '100%',
    height: '100%',
    paddingBottom: 80,
  }, 

  cardDescription:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: fontSize,
  },
  cardTitle:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: fontSize,
  },

  signUpButton: {
    position: 'absolute',
    bottom: 0,
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
    bottom: 75,
    backgroundColor: '#D73F09',
    borderRadius: 16,
    borderWidth: 1,
    display: 'flex',
    margin: 'auto',
    borderColor: '#D73F09',
    width: '97%',

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
  studentsSignedUp: {
    fontSize: fontSize/1.5,
  },
  studentsSignedUpHeader: {
    fontSize: fontSize/1.5,
    fontWeight: 'bold',
    paddingTop: 20,
  }

});