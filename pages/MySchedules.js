import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableWithoutFeedback
} from 'react-native'
import { getLodge } from './../Client/API/index.js'
export default class MySchedules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
      cardName: "unset",
      cardLoc: "unset",
      cardDesc: "unset",

    };


  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    this.setState({ data });
  }
  //Adds object to Events  //addToEvents = async () =>
  addToEvents = async () => {
    const { name, description, location } = this.state;
    await addEventToList(name, description, location);
    this.getData();
    this.setState(initialState);
    this.onCreatePress(0);
    
  }
  expandInfo(name, location, description){
    this.setState({
      cardName: name,
      cardLoc: location,
      cardDesc: description,
      eventList: 2
    })
  }
  showList(arr) {

    return arr.map((lodge, i) => {
      return <TouchableWithoutFeedback onPress={() => this.expandInfo(lodge.name, lodge.location, lodge.description)}>
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

  sendCard(){
    return(<React.Fragment>
        <View>{this.state.cardName}</View>
        <View>{this.state.cardLoc}</View>
        <View>{this.state.cardDesc}</View>
        <Button style={styles.createbutton} color = '#ff9900' title="Return to list" onPress={() => this.onCreatePress(0)}></Button>
      </React.Fragment>
    )
  }

  sendEventList(){
    const { data } = this.state
    return(
      <View style={styles.container}>
        <React.Fragment>
        { //If data then display api otherwise loading indicator
          data ? ( //if data
            <React.Fragment>
              {/*this is how you get 1 item
          <Text style={styles.bold}>{data.events[0].name}</Text>
          */}

              {/*this is how you get multiple items*/}

              <View style={styles.eventbox}>
                {data && this.showList(this.state.data)}
              </View>
            </React.Fragment>
          )
            : //else 
            (<ActivityIndicator />)
        }
        </React.Fragment>
        <React.Fragment><Button style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.onCreatePress(1)} ></Button></React.Fragment>
      </View>
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
  
  formLabel:{
    marginLeft: '20%',
  },

  formInput:{
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },

  createbutton:{
    width: 44,
    height: 44,
    borderRadius: 44/2,
    alignSelf: 'flex-end'
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
    height: 100,
    padding: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  title: {

    color: '#ff9900',
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


