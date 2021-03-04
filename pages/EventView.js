import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { getEvent,addEventToList } from '../Client/API/index.js';
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
      const {name, edate, location, description, etime, slots, maxslots} = this.props.route.params;
    return (
      <React.Fragment>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <TouchableOpacity style = {styles.optionBox} onPress={this.signUp}><Ionicons name={"md-more"} size={42} colro={'gray'} /></TouchableOpacity>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('ViewEvents')}><Ionicons name={"ios-arrow-back"} size={42} colro={'gray'} /></TouchableOpacity>
        <Text style = {styles.cardTitle}>{name}</Text>
        <Text style = {styles.cardWhenWhere}>{edate.slice(0, 10) }</Text>
        <Text style = {styles.cardWhenWhere}>{location} at {etime.slice(0,5)}</Text>
        <Text style = {styles.cardDescription}>{description}</Text>
        <Button style = {styles.bottomButton}color = '#ff9900' title="Sign Up" onPress={() => this.onCreatePress(0)}></Button>
        </View>  
      </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  syncHolder:{
    color: 'black',

    borderColor: 'gray',
    borderBottomWidth: '2px',
    borderTopWidth: '2px',
    width: '100%',
  },

  goBack:{
    fontSize: '40px',
    color: 'darkgrey',
    width: '45px',
    marginTop: '5px',
    marginLeft: '5px',
    zIndex: 1,
  },

  signSheetClose:{
    color: 'black',
    fontSize: '25px',
    textAlign: 'end',
    marginTop: '5px',
    marginRight: '5px',
  },

  signSheetText:{
    fontSize: '25px',
    marginTop: '25px',
    marginLeft: '3px',
    marginRight: '3px',
    textAlign: 'center',
    
  },

  signSheet:{
    position: 'fixed',
    top: '5%',
    bottom: '20%',
    left: '20%',
    right: '20%',
    backgroundColor: 'lightgrey',
    zIndex: 2,
    borderColor: 'black',
    borderWidth: '2px',
    borderRadius: '8px',
    
    
  },
  moreIcon:{
    fontSize: '40px',
    color: 'darkgrey',
    borderWidth: '0px',
    borderColor: 'darkgrey',
    width: '45px',
    textAlign: 'end',
    marginTop: '10px',
    marginRight: '20px',
    borderRadius: '5px',
    zIndex: 1,
  },
  optionBox:{
    right: 0,
    position: 'fixed',
    zIndex: 1,
  },
  cardElement:{
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  cardWhenWhere:{
    color: 'grey',
    textAlign: 'left',
    fontSize: 25,
  },
  displayCard:{
    position:'fixed',
    width: '100%',
    height: '100%',
    paddingBottom: '80px',
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

  finishCreateButton: {
    position: 'fixed',
    bottom: 45,
    padding: 50,
    paddingLeft: '10%',
    paddingRight: '10%',
    borderRadius: '16px',
    width: '100%',
  },
  bottomButton:{
    position: 'fixed',
    bottom: 45,
    padding: 50,
    paddingLeft: '10%',
    paddingRight: '10%',
    borderRadius: '16px',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%'
  },

});