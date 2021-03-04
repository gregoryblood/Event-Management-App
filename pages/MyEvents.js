import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { getEvent,addEventToList } from '../Client/API/index.js';
import { Icon } from '@ant-design/react-native';

export default class MySchedules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
      currCard: null,
      doSign: 1,

    };

    this.signUp = this.signUp.bind(this);
    this.signDown = this.signDown.bind(this);
  }

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  componentDidMount() {
    this.getEvent();
  }

  async getEvent() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    this.setState({ data });
  }
  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location } = this.state;
    const eDate = new Date();
    await addEventToList(name, description, location,moment(eDate).format('YYYY-MM-DD'),moment(eDate).format('HH:mm:ss'), 0, 0);
    this.getEvent();
    this.onCreatePress(0);
    
  }
  expandInfo(event){
    this.setState({
      currCard: event,
      eventList: 2,
      doSign: 1
    })
  }
  showList(arr) {

    return arr.map((event, i) => {
      return <TouchableOpacity onPress={() => this.expandInfo(event)}>
        <View style={styles.event} key={i}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>

      </View>
      </TouchableOpacity>
    })
  }
  sayTest(){
    if (this.state.eventList == 0) return <h1>Test</h1>
  }

  onCreatePress(changeTo){
    this.setState({
      eventList: changeTo,
    });

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

  sendCard(){
    //name description location edate etime slots maxslots
    return(<>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <TouchableOpacity style = {styles.optionBox} onPress={this.signUp}><View style = {styles.optionBox}><Icon name={"more"} style = {styles.moreIcon}/></View></TouchableOpacity>
        <TouchableOpacity onPress = {() => this.onCreatePress(0)}><View><Icon name={"arrow-left"} style = {styles.goBack}/></View></TouchableOpacity>
          <View style = {styles.cardTitle}>{this.state.currCard.name}</View>
          <View style = {styles.cardElement}><Text style = {styles.cardWhenWhere}>{this.state.currCard.edate.slice(0, 10)}</Text></View>
          <View style = {styles.cardElement}><Text style = {styles.cardWhenWhere}>{this.state.currCard.location} at {this.state.currCard.etime.slice(0,5)}</Text></View>
          <View style = {styles.cardElement}><Text style = {styles.cardDescription}>{this.state.currCard.description}</Text></View>
          <View style = {styles.bottomButton}><Button   color = '#ff9900' title="Sign Up" onPress={() => this.onCreatePress(0)}></Button></View>
        </View>      
      </>
    )
  }

  sendEventList(){
    const { data } = this.state
    return(
      <>
      <View style={styles.container}>
        <React.Fragment>
        { //If data then display api otherwise loading indicator
          data ? ( //if data
            <React.Fragment>

              <View style={styles.eventbox}>
                {data && this.showList(this.state.data)}
              </View>
            </React.Fragment>
          )
            : //else 
            (<ActivityIndicator />)
        }
        </React.Fragment>
      </View>
      <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.onCreatePress(1)}>
        <Icon name={"plus"} style={styles.icon}/>
      </TouchableOpacity>

      </>
    ) 
  }
  sendCreateForm(){
    return(
      <React.Fragment>
        <form>
          <Text style={styles.formLabel}>Event Name</Text>
          <TextInput onChangeText={this.updateField('name')}
            style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Description</Text>
          <TextInput onChangeText={this.updateField('description')}
            style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Location</Text>
          <TextInput onChangeText={this.updateField('location')}
            style={styles.formInput} type="text"></TextInput><br></br>
            <Text style={styles.formLabel}>Event Time</Text>
            
          <TextInput onChangeText={this.updateField('location')}
            style={styles.formInput} type="text"></TextInput><br></br>
            <Text style={styles.formLabel}>Event Date</Text>
          <TextInput onChangeText={this.updateField('location')}
            style={styles.formInput} type="text"></TextInput><br></br>
        </form>
        <Button onPress={this.addToEvents} style={styles.finishCreateButton} color = '#ff9900' title="Submit Event" ></Button>
      </React.Fragment>
    )
  }
  displayOrCreate(){
    if (this.state.eventList == 0) return this.sendEventList();
    if(this.state.eventList == 1) return this.sendCreateForm();
    if(this.state.eventList == 2) return this.sendCard();
  }

  render() {
    return (
        <React.Fragment>
          {this.displayOrCreate()}
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
    marginLeft: '5%',
    textAlign: 'left',
    fontSize: 45,
  },
  formLabel:{
    marginLeft: '5%',
    fontSize: 35,
  },

  formInput:{
    margin: 20,
    borderStyle: 'solid',
    height: '40px',
    borderWidth: 1,
    borderRadius: '8px',
    borderColor: 'black',
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

  icon: {
    color: 'white',
    fontSize: 35,
    display: 'flex',
    flex: 1,
    alignContent: 'center'
  },
  createbutton:{
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: 'orange',
    margin: 10,
    marginLeft: 'auto',
    padding: '13px'
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
  event: {
    flexDirection: "column",
    //height: 100,
    padding: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 22
  },
  description: {
    fontSize: 16
  },
  location: {
    fontSize: 16,
    fontStyle: "italic",
    color: 'gray'
  },
});


