import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventView from './EventView';
import ViewEventsWithSearch from './ViewEventsWithSearch';

const MyEventStack = createStackNavigator();

export default class Search extends Component {

  render() {
    return (
      <MyEventStack.Navigator>
        <MyEventStack.Screen name="ViewEvents" component={ViewEventsWithSearch} options={{headerShown: false}} />
        <MyEventStack.Screen name="EventView" component={EventView} options={{headerShown: false}}/>
      </MyEventStack.Navigator>
    )
  }
}
