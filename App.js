import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyEvents from './pages/MyEvents';
import Explore from './pages/Explore';
import Search from './pages/Search';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ flex: 1}}>
      <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Explore') {
                    iconName = 'ios-add-circle-outline';
                  } else if (route.name === 'MyEvents') {
                    iconName = 'ios-list';
                  }
                  else if (route.name === 'Search') {
                    iconName = 'ios-search';
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={40} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'orange',
                inactiveTintColor: 'gray',
              }}>
        <Tab.Screen name="MyEvents" size={40} component={MyEvents} options={{title: ''}}/>
        <Tab.Screen name="Explore" component={Explore} options={{title: ''}}/>
        <Tab.Screen name="Search" component={Search} options={{title: ''}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*
<StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        style={{ height: 20 }}
      />
*/

