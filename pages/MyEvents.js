import React, { Component, } from 'react'
import CreateEvent from './CreateEvent';
import { createStackNavigator } from '@react-navigation/stack';
import ViewEvents from './ViewEvents.js';
import EventView from './EventView.js';
import Calendar from './Calendar'
import ViewMyEvents from './ViewMyEvents';
const MyEventStack = createStackNavigator();

export default class MyEvents extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <MyEventStack.Navigator>
        <MyEventStack.Screen name="ViewMyEvents" component={ViewMyEvents} options={{headerShown: false}} />
        <MyEventStack.Screen name="Calendar" component={Calendar} options={{headerShown: false}} />
        <MyEventStack.Screen name="CreateEvent" component={CreateEvent} options={{headerTitle: 'Create an Event'}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}}/>
      </MyEventStack.Navigator>
    )
  }
}