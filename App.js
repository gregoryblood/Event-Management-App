import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { 
  ActivityIndicator, 
  AppRegistry,
  StyleSheet, 
  Text, 
  View,
  Dimensions  } from 'react-native';
import { getLodge } from './Client/API/index.js'


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    //When app.js loads it will run an async func
    this.getData();
    //Listens for screen change
  }

  async getData() {
    //Calls api and will finish when data is loaded
    const { data } = await getLodge();
    this.setState({ data });
    console.log(data);
  }
  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        { //If data then display api otherwise loading indicator
        data ? ( //if data
          <React.Fragment>
            {/*this is how you get 1 item
            <Text style={styles.bold}>{data.events[0].name}</Text>
            */}
            
            {/*this is how you get multiple items*/}
            <View style={styles.eventbox}>
              {data.events.map((lodge, i) => (
                  <View style={styles.event}  key = {i}>
                    <Text style = {styles.title}>{lodge.name}</Text>
                    <Text style = {styles.location}>{lodge.location}</Text>
                    <Text style = {styles.description}>{lodge.description}</Text>
                  </View>
              ))}
            </View>
          </React.Fragment>
          
          
        ) 
        : //else 
        (<ActivityIndicator/>)
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventbox: {
    flexDirection: "column",
    flex:1,
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
  }
});


