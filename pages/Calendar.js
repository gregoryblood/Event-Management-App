import React, { Component, } from 'react'
import CreateEvent from './CreateEvent';
import { createStackNavigator } from '@react-navigation/stack';

import EventView from './EventView.js';
import CalendarView from './CalendarView';
const MyEventStack = createStackNavigator();

export default class Calednar extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <MyEventStack.Navigator>
        <MyEventStack.Screen name="CalendarView" component={CalendarView} options={{headerShown: false}} />
        <MyEventStack.Screen name="CreateEvent" component={CreateEvent} options={{headerTitle: 'Create an Event'}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}}/>
      </MyEventStack.Navigator>
    )
  }
}