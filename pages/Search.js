import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput
} from 'react-native';


const initialState = {
  search: ''
};

export default class Search extends Component {
  state = initialState;

  updateField = (field) => (text) => {
    this.setState({ [field]: text });
  }

  render() {
    return (
      <View>
        <form >
          <TextInput value ="Search" onChangeText={this.updateField('search')}
            style={styles.formInput} type="text"></TextInput><br></br>
        </form>
      </View>
    )
  }


  componentDidMount() {
  }
}

const styles = StyleSheet.create({
  
  formArea:{
    position: "fixed",
    bottom: 0,
  },
  formLabel:{
    marginLeft: 0,
  },

  formInput:{
    margin: 0,
    padding: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    height: '200%',
    borderRadius: 1,
    borderColor: 'gray',
    fontSize: 24,
    
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
