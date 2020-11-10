import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { 
  ActivityIndicator, 
  AppRegistry,
  StyleSheet, 
  Text, 
  View } from 'react-native';
import { getLodge } from './Client/API/index.js'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    //When app.js loads it will run an async func
    this.getData();
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
            <React.Fragment>
              {data.events.map((lodge, i) => (
                  <Text key = {i}>
                    <Text style = {styles.bold}>
                      {lodge.name}
                    </Text>
                    <Text>{lodge.description}</Text>
                    <Text>{lodge.location}</Text>
                  </Text>
              ))}
            </React.Fragment>
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
  bold: {
    fontWeight: 'bold',
  }
});


