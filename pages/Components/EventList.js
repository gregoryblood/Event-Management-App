import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import {MilToCil} from '../HelperFuncs'

export function EventList(nav, from, arr, theAuthor) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => nav.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        lastPage: from
                                        })}>
      <View style={styles.event} >
        {event.slots > 0 ? 
        <Text style={styles.titleOrange}>{event.name}</Text>
        :
        <Text style={styles.title}>{event.name}</Text>
        }
        <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
        <Text style={styles.location}>{event.location} at {MilToCil(event.etime)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
        <ProgressBar visible={event.maxslots > 0 ? true : false} progress={event.slots/event.maxslots} color={Colors.orange800} />
      </View>
      </TouchableOpacity>
    })
}

const styles = StyleSheet.create({
    
    event: {
      flexDirection: "column",
      //height: 125,
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
      color: '#ff7600',
      fontWeight: 'bold',
      fontSize: 22
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    location: {
      fontSize: 16,
      fontStyle: "italic",
      color: 'gray'
    },
  });