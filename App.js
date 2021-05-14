import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Feather} from '@expo/vector-icons';
import MyEvents from './pages/MyEvents';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Calendar from './pages/Calendar';
import './pages/global.js';
import { getUser } from './Client/API/index.js';
import withFirebaseAuth from 'react-with-firebase-auth';
import { firebase } from '@firebase/app'
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';


const Tab = createBottomTabNavigator();
var firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({});
}else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

async function getUserData(email) {
  try {
    const { data } = await getUser(email);
    
    if (!data || data.meta.totalResults == 0) {
      showError = true;
      return;
    }

    gUser.type = data.data[0].attributes.primaryAffiliation;
    //Can set youself as admin here
    gUser.type = 'Admin';

    isValid = true;
    return isValid; 
  }
  catch(e) {
    return; 
  }
  
}
var isValid = false;
var showError = false;
function App({ user, signOut, signInWithGoogle }) {
  const [loggedIn, setLoggedIn] = useState(false);
  if (user) {
    getUserData(user.email).then(() => {
      if (isValid == true) {
        gUser.email = user.email;
        gUser.onid = gUser.email.substr(0, gUser.email.indexOf('@'));
        setLoggedIn(true);
      }
      else {
        firebase.auth().signOut().then(() => {
          alert("Not an email associated with OSU");
          window.location.href = '/';
        }).catch((error) => {
          alert("Could not sign out");
        });
      }
    });
  }
  
  return ( 
    loggedIn ? 
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
      : 
      <View style={styles.loginArea}>
        <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle}>
          <Text style={styles.title1}>OSU</Text>
          <Text style={styles.title2}>Events</Text>

          <Text style={styles.loginText}>Login</Text>
          {showError && 
          <Text style={styles.errorText}>Not an Oregon State Account</Text>
          }
        </TouchableOpacity>
      </View>
      
);
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
const styles = StyleSheet.create({ 
  loginArea: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  loginButton: {
    flex: 1, 
    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ff7600',
    borderRadius: 16,
    height: 100,
    width: 200,
    position: 'absolute',
    margin: 'auto'
  },
  loginText: {
    color: 'white',
    fontSize: 32,
  },
  errorText: {
    zIndex: -1,
    bottom: -225,
    fontSize: 22,
    color: 'tomato',
    textAlign: 'center',
    width: 300,
    height: 200,
    position: 'absolute',
    margin: 'auto',
    marginTop: 40
  },
  title1: {
    zIndex: -1,
    bottom: 0,
    fontSize: 64,
    textAlign: 'center',
    width: 300,
    height: 325,
    position: 'absolute',
    margin: 'auto',
    marginTop: 40
  },
  title2: {
    zIndex: -1,
    bottom: 0,
    fontSize: 64,
    textAlign: 'center',
    width: 300,
    height: 250,
    position: 'absolute',
    margin: 'auto',
    marginTop: 40
  }
});
/*
<StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        style={{ height: 20 }}
      />
*/

