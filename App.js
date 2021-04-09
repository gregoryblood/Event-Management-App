import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyEvents from './pages/MyEvents';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Calendar from './pages/Calendar';

import withFirebaseAuth from 'react-with-firebase-auth';
import { firebase } from '@firebase/app'
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';


const Tab = createBottomTabNavigator();
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


function App({ user, signOut, signInWithGoogle }) {
  console.log(user);
  return ( 
    user ? 
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
                    else if (route.name === 'Calendar') {
                      iconName = 'ios-calendar';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={35} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'orange',
                  inactiveTintColor: 'gray',
                }}>
          
          <Tab.Screen name="MyEvents" component={MyEvents} options={{title: ' '}}/>
          <Tab.Screen name="Calendar" component={Calendar} options={{title: ' '}}/>
          <Tab.Screen name="Explore" component={Explore} options={{title: ' '}}/>
          <Tab.Screen name="Search" component={Search} options={{title: ' '}}/>
        </Tab.Navigator>
      </NavigationContainer>
      : <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
/*
<StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        style={{ height: 20 }}
      />
*/

