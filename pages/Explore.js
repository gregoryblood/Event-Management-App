import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EventView from './EventView.js';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';
import ViewEvents from './ViewEvents'
const MyEventStack = createStackNavigator();

export default class Explore extends Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <MyEventStack.Navigator>
        <MyEventStack.Screen name="ViewEvents" component={ViewEvents} options={{headerShown: false}}/>
        <MyEventStack.Screen name="CreateEvent" component={CreateEvent} options={{headerShown: false}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}} />
        <MyEventStack.Screen name="EditEvent" component={EditEvent} options={{headerShown: false}} />

      </MyEventStack.Navigator>
    )
  }
}