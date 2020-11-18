import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput
} from 'react-native'
import { getLodge } from './../Client/API/index.js'
export default class MySchedules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      eventList: 0,
    };

  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    //Calls api and will finish when data is loaded
    const { data } = await getLodge();
    this.setState({ data });
    console.log(data);
  }

  showList(arr) {
    return arr.map((lodge, i) => {
      return <View style={styles.event} key={i}>
        <Text style={styles.title}>{lodge.name}</Text>
        <Text style={styles.location}>{lodge.location}</Text>
        <Text style={styles.description}>{lodge.description}</Text>
      </View>
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
                {data && this.showList(this.state.data.events)}
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
          <TextInput style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Description:</Text>
          <TextInput style={styles.formInput} type="text"></TextInput><br></br>
          <Text style={styles.formLabel}>Event Location</Text>
          <TextInput style={styles.formInput} type="text"></TextInput><br></br>
        </form>
        <Button style={styles.createbutton} color = '#ff9900' title="Submit Event" onPress={() => this.onCreatePress(0)}></Button>
      </React.Fragment>
    )
  }
  displayOrCreate(){
    if (this.state.eventList == 0) return this.sendEventList();
    if(this.state.eventList == 1) return this.sendCreateForm();
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
    paddingLeft: '25%',
    paddingRight: '25%',
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


