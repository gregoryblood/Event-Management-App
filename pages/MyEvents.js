import React, { Component, } from 'react'
import CreateEvent from './CreateEvent';
import { createStackNavigator } from '@react-navigation/stack';
import EventView from './EventView.js';
import ViewMyEvents from './ViewMyEvents';
import EditEvent from './EditEvent';
const MyEventStack = createStackNavigator();

export default class MyEvents extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <MyEventStack.Navigator>
        <MyEventStack.Screen name="ViewMyEvents" component={ViewMyEvents} options={{headerShown: false}}  />
        <MyEventStack.Screen name="CreateEvent" component={CreateEvent} options={{headerShown: false}} />
        <MyEventStack.Screen name="EditEvent" component={EditEvent} options={{headerShown: false}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}}/>
      </MyEventStack.Navigator>
    )
  }
}