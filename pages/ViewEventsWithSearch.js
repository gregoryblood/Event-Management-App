import React, { Component, } from 'react'
import {
  View, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEvent, searchEvents } from '../Client/API/index.js';


export default class ViewEventsWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search: null,
    };
  }
  componentDidMount() {
    this.getEvent();
  }
  updateField = (field) => (text) => {
    text = text.toLowerCase();
    text = text.replace(/\W/g, '') //Strips all non letter/number characters
    if (text != this.state.search && text.length > 1) {
      this.setState({ [field]: text }, () => {
        if (this.state.search != '')
          //console.log(this.state.search);
          this.searchEvents();
      });
    }
  }
  async getEvent() {
    //Calls api and will finish when data is loaded
    const { data } = await getEvent();
    this.setState({ data });
  }
  async searchEvents() {
    const { data } = await searchEvents(this.state.search);
    this.setState({ data });
  }

  showList(arr) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => this.props.navigation.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate
                                        })}>
      <View style={styles.event} >
        {
          event.slots == 0 ?
          <Text style={styles.title}>{event.name}</Text>
          :
          <Text style={styles.titleOrange}>{event.name}</Text>
        }
        <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
        <Text style={styles.location}>{event.location} at {event.etime.slice(0,5)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
      </View>
      </TouchableOpacity>
    })
  }

  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
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
          
        </ScrollView>
        <TextInput style={styles.searchbar} onChangeText={this.updateField('search')} placeholder={'Search'}></TextInput>
      </React.Fragment>
    )
  }

}
const styles = StyleSheet.create({
  container: {

  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%',
    position: 'absolute',
    height: '100%'
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
  titleOrange: {
    color: "orange",
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
  searchbar: {
    backgroundColor: 'white',
    padding: 30,
    fontSize: 30,
    borderTopWidth: 1,
    borderColor: 'gray'
  }
});