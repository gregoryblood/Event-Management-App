import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableWithoutFeedback
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
  expandInfo(lodge){
    this.setState({
      currCard: lodge,
      eventList: 2,
      doSign: 1
    })
  }
  showList(arr) {

    return arr.map((lodge, i) => {
      return <TouchableWithoutFeedback onPress={() => this.expandInfo(lodge)}>
        <View style={styles.event} key={i}>
        <Text style={styles.title}>{lodge.name}</Text>
        <Text style={styles.location}>{lodge.location}</Text>
        <Text style={styles.description}>{lodge.description}</Text>

      </View>
      </TouchableWithoutFeedback>
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
        <TouchableWithoutFeedback onPress = {this.signDown}><Icon style = {styles.signSheetClose} name = {'close'}/></TouchableWithoutFeedback>
        <Text style = {styles.signSheetText}>This event has the option of to be integrated with your persoal calendar</Text>
        <View style = {styles.syncHolder}><Button style = {styles.calendarSyncButton} title = 'Sync Calednar' color = 'orange'></Button></View>
      </View>
    );
  }

  sendCard(){
    //name description location edate etime slots maxslots
    return(<>
        <React.Fragment>{this.signForm()}</React.Fragment>
        <View style ={styles.displayCard}>
        <TouchableWithoutFeedback style = {styles.optionBox} onPress={this.signUp}><View style = {styles.optionBox}><Icon name={"more"} style = {styles.moreIcon}/></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress = {() => this.onCreatePress(0)}><View><Icon name={"arrow-left"} style = {styles.goBack}/></View></TouchableWithoutFeedback>
          <View style = {styles.cardTitle}>{this.state.currCard.name}</View>
          <View style = {styles.cardElement}><Text style = {styles.cardWhenWhere}>{this.state.currCard.edate.slice(0, 10)}</Text></View>
          <View style = {styles.cardElement}><Text style = {styles.cardWhenWhere}>{this.state.currCard.location} at {this.state.currCard.etime.slice(0,5)}</Text></View>
          <View style = {styles.cardElement}><Text style = {styles.cardDescription}>{this.state.currCard.description}</Text></View>
          <View style = {styles.bottomButton}><Button style={styles.returnButton}  color = '#ff9900' title="Sign Up" onPress={() => this.onCreatePress(0)}></Button></View>
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
      <React.Fragment><Button style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.onCreatePress(1)} ></Button></React.Fragment>

      </>
    ) 
  }
  sendCreateForm(){
    return(
      <React.Fragment>
        <form>
          <Text style={styles.formLabel}>Event Name:</Text>
          <TextInput onChangeText={this.updateField('name')}
            style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Description:</Text>
          <TextInput onChangeText={this.updateField('description')}
            style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Location</Text>
          <TextInput onChangeText={this.updateField('location')}
            style={styles.formInput} type="text"></TextInput><br></br>
        </form>
        <Button onPress={this.addToEvents} style={styles.createbutton} color = '#ff9900' title="Submit Event" ></Button>
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
    marginTop: '125px',
    marginLeft: '10px',
    marginRight: '10px',
    borderColor: 'black',
    borderRadius: '8px',
    borderWidth: '2px',
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
    borderWidth: '2px',
    borderColor: 'darkgrey',
    width: '45px',
    textAlign: 'end',
    marginTop: '5px',
    marginRight: '5px',
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
  },
  displayCard:{
    position:'fixed',
    overflow: 'scroll',
    width: '100%',
    height: '100%',
    paddingBottom: '80px',
  }, 
  cardText:{
    fontSize: 25,
  },
  cardDescription:{
    fontSize: 25,
  },
  cardTitle:{
    textAlign: 'center',
    fontSize: 45,
  },
  formLabel:{
    marginLeft: '20%',
  },

  formInput:{
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  bottomButton:{
    position: 'fixed',
    bottom: 45,
    width: '100%',
  },
  returnButton:{
    height: '20px',
  },
  createbutton:{
    width: 44,
    height: 44,
    borderRadius: 44/2,
    zIndex: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%'
  },
  event: {
    flexDirection: "column",
    height: 100,
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


