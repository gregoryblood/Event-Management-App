import React, { Component, } from 'react'
import CreateEvent from './CreateEvent';
import { createStackNavigator } from '@react-navigation/stack';
import ViewEvents from './ViewEvents.js';
import EventView from './EventView.js';
import Calendar from './Calendar'
const MyEventStack = createStackNavigator();

export default class MyEvents extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <MyEventStack.Navigator>
        {/*This top one will change to just events signed up for */}
        <MyEventStack.Screen name="ViewEvents" component={ViewEvents} options={{headerShown: false}} />

        <MyEventStack.Screen name="Calendar" component={Calendar} options={{headerShown: false}} />
        <MyEventStack.Screen name="CreateEvent" component={CreateEvent} options={{headerTitle: 'Create an Event'}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}}/>
      </MyEventStack.Navigator>
    )
  }
}