import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { 
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  Text, 
  View } from 'react-native';
import { getWeather } from './Client/API/index.js'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true
    };
  }

  componentDidMount() {
    //When app.js loads it will run an async func
    this.getData();
  }
  async getData() {
    //Calls api and will finish when data is loaded
    const { data } = await getWeather();
    this.setState({ data });
  }
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        { //If data then display api otherwise loading indicator
        data ? (
          <Text>{data.weather[0].main}</Text>): 
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
});
