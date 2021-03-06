import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { getEvent,addEventToList, addAttendee } from '../Client/API/index.js';
import { Icon } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class EventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
      doSign: 1,

    };

    this.signUp = this.signUp.bind(this);
    this.signDown = this.signDown.bind(this);
  }


  componentDidMount() {
    
  }
  onCreatePress(changeTo){
    
  }
  addToList(){
    const {id, name, edate, location, description, etime, slots, maxslots, fromMyEvent} = this.props.route.params;
    //Method will change once login is implemented
    if((slots + 1) != maxslots){
      addAttendee(id);
    }
    if(fromMyEvent){
      this.props.navigation.navigate('ViewMyEvents');
    }
    else{
      this.props.navigation.navigate('ViewEvents');
    }
  }

  signUp(){
    this.setState({
      doSign: 0
    });
  }
  
  signDown(){
    this.setState({
      doSign: 1
    });
  }

  signForm(){
    if(this.state.doSign == 0) return(
      <View style = {styles.signSheet}>
        <TouchableOpacity onPress = {this.signDown}><Icon style = {styles.signSheetClose} name = {'close'}/></TouchableOpacity>
        <View style = {styles.syncHolder}><Button style = {styles.calendarSyncButton} title = 'Sync Calednar' color = 'orange'></Button></View>
      </View>
    );
  }

  render() {
      const {id, name, edate, location, description, etime, slots, maxslots, fromMyEvent} = this.props.route.params;
    return (
      <View style ={styles.containter}>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <View style ={styles.viewBar}>
          <TouchableOpacity style = {styles.backBox} onPress={() => fromMyEvent ? this.props.navigation.navigate('ViewMyEvents') : this.props.navigation.navigate('ViewEvents')}><Ionicons name={"ios-arrow-back"} size={42} colro={'gray'} /></TouchableOpacity>
          <TouchableOpacity style = {styles.optionBox} onPress={this.signUp}><Ionicons name={"md-more"} size={42} colro={'gray'} /></TouchableOpacity>
        </View>
        <Text style = {styles.cardTitle}>{name}</Text>
        <Text style = {styles.cardWhenWhere}>{edate.slice(0, 10) }</Text>
        <Text style = {styles.cardWhenWhere}>{location} at {etime.slice(0,5)}</Text>
        <Text style = {styles.cardDescription}>{description}</Text>
        <View style = {styles.bottomButton}>
          <Button color = '#ff9900' title="Sign Up" onPress={() => this.addToList()}></Button>
        </View>
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
    padding: '4%',
    position: 'fixed',
    zIndex: '0',
    width: '100%',
    height:'100%',
  },
  syncHolder:{
    color: 'black',
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    width: '100%',
  },

  backBox:{
    fontSize: 40,
    color: 'darkgrey',
    width: '45px',
    marginTop: '5px',
    marginLeft: '5px',
  },

  signSheetClose:{
    color: 'black',
    fontSize: 25,
    textAlign: 'right',
    marginTop: '5px',
    marginRight: '5px',
  },

  signSheetText:{
    fontSize: 25,
    marginTop: '25px',
    marginLeft: '3px',
    marginRight: '3px',
    textAlign: 'center',
    
  },

  signSheet:{
    top: '5%',
    bottom: '20%',
    left: '20%',
    right: '20%',
    backgroundColor: 'lightgrey',
    zIndex:'2',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    height: '40%'
    
  },
  moreIcon:{
    fontSize: 40,
    color: 'darkgrey',
    borderWidth: 0,
    borderColor: 'darkgrey',
    width: '45px',
    textAlign: 'right',
    marginTop: 10,
    marginRight: 20,
    borderRadius: 5,
    zIndex: 1,
  },
  optionBox:{
    alignSelf: 'flex-end',
    right: 0,
    zIndex: 1,
  },
  cardElement:{
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center',
  },
  cardWhenWhere:{
    color: 'grey',
    textAlign: 'left',
    fontSize: 25,
    textAlign: 'center',
  },
  displayCard:{
    width: '100%',
    height: '100%',
    paddingBottom: 80,
  }, 
  cardText:{
    fontSize: 25,
    textAlign: 'left',
    textAlign: 'center',
  },
  cardDescription:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 25,
    textAlign: 'center',
  },
  cardTitle:{
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 45,
    textAlign: 'center',
  },

  bottomButton:{
    position: 'fixed',
    bottom: '50px',
    left: '0',
    right: '0',

  },


});