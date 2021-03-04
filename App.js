import React from 'react';
import { View, StatusBar } from 'react-native';
import Home from './pages/Navbar'

function configureScene(route) {
  return route.scene || Navigator.SceneConfigs.FloatFromBottom
}
export default function App() {
  return (
    <View style={{ flex: 1, }}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        style={{ height: 20 }}
      />
      <Home></Home>
    </View>
  );
}


