import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import {MilToCil} from '../HelperFuncs'
import { LinearProgress } from 'react-native-elements';

const {
  width: SCREEN_WIDTH,
} = Dimensions.get('window');
var fontSize = 20;
if (SCREEN_WIDTH > 400) {
  fontSize = 26;
}

export function EventList(nav, from, arr, showAll) {
  if (!arr)
    return <Text></Text>;

  return arr.map(event => {
    if (gUser.events) {
      if (!gUser.events) {
        return;
      }

      const issignedup = gUser.events.some(e => (e.email != undefined && e.eventsid == event.id) );
      const isowned = gUser.events.some(e => (e.email == undefined && e.eventsid == event.id) );
      return <TouchableOpacity key={event.id} onPress={() => nav.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        lastPage: from, owned: (event.author == gUser.email ? true : false), signedup: event.signedup
                                        })}>
      {
        //Essentially if on 'My Events' owned and signed up events are shown
        //otherwise events not owned or signed up will show
        ((showAll && !isowned && !issignedup) || (!showAll && (isowned || issignedup) )) && 
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
        {event.maxslots > 0 && 
          <LinearProgress 
          variant='determinate'
          color="#D73F09"
          value={event.slots/event.maxslots}/>
        }

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
      backgroundColor: '#D73F09',
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
      fontSize: fontSize
    },
    titleOrange: {
      color: '#D73F09',
      fontWeight: 'bold',
      fontSize: fontSize
    },
    description: {
      fontSize: fontSize/1.3,
      marginBottom: 10,
    },
    location: {
      fontSize: fontSize/1.3,
      fontStyle: "italic",
      color: 'gray'
    },
  });