import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import {MilToCil} from '../HelperFuncs'
import { LinearProgress } from 'react-native-elements';

export function EventList(nav, from, arr, showAll) {
    return arr.map(event => {
      if (gUser.events) {
        if (gUser.events);
        const issignedup = gUser.events.some(e => (e.email != undefined && e.eventsid == event.id) );
        const isowned = gUser.events.some(e => (e.email == undefined && e.eventsid == event.id) );
        return <TouchableOpacity key={event.id} onPress={() => nav.navigate('EventView', { 
                                          id: event.id, name: event.name,  location: event.location, description: event.description,
                                          etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                          lastPage: from, owned: (event.author == gUser.email ? true : false), signedup: event.signedup
                                          })}>
        {
          (showAll || issignedup || isowned) && 
          <View style={styles.event} >
          {event.author == gUser.email ?
            <View style={styles.icon} />
            :
            <View/>
          }
          {
            issignedup
            ? 
            <Text style={styles.titleOrange}>{decodeURIComponent(event.name)}</Text>
            :
            <Text style={styles.title}>{decodeURIComponent(event.name)}</Text>
          }
          <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
          <Text style={styles.location}>{decodeURIComponent(event.location)} at {MilToCil(event.etime)}</Text>
          <Text style={styles.description}>{
            decodeURIComponent(event.description.length) > 50 ? 
              decodeURIComponent(event.description).slice(0,50) + "..." 
              : 
              decodeURIComponent(event.description)
            }
          </Text>
          <LinearProgress 
            variant='determinate'
            color="#ff9900"
            value={event.slots/event.maxslots}/>
        </View>
        }
        </TouchableOpacity>
      }
    })
}
const styles = StyleSheet.create({
    icon: {
      position: 'absolute',
      right: 20,
      top: 20,
      backgroundColor: '#ff9900',
      borderRadius: 25/2,
      height: 25,
      width: 25,
    },
    event: {
      flexDirection: "column",
      //height: 125,
      //marginTop: -1,
      padding: 20,
      borderWidth: 0,
      //borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'gray',
      borderStyle: 'solid',
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