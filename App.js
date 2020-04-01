import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioComponent from './components/Inicio'
import PrincipalComponent from './components/Principal'
import ParadasComponent from './components/Paradas'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getProvidesAudioData } from 'expo/build/AR';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Ajustes = () => (
  <ScreenContainer>
    <Text>Ajustes...</Text>
  </ScreenContainer>
);

export const Compartir = () => (
  <ScreenContainer>
    <Text>Compartir...</Text>
  </ScreenContainer>
);

export const Paradas = () => (
  <ScreenContainer>
    <Text>Paradas...</Text>
  </ScreenContainer>
);

const TabsScreen = () => (
  <Tabs.Navigator tabBarOptions={{
    activeTintColor: '#e91e63',
  }}  >
    <Tabs.Screen
      name="Mapa"
      component={PrincipalComponent}
      options={{
        tabBarLabel: 'Mapa',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map" color={color} size={26} />
        ),
      }} />
    <Tabs.Screen
      name="Paradas"
      component={Paradas}
      options={{
        tabBarLabel: 'Paradas',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker" color={color} size={26} />
        ),
      }} />
      <Tabs.Screen
      name="Compartir"
      component={Compartir}
      options={{
        tabBarLabel: 'Compartir',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="share-variant" color={color} size={26} />
        ),
      }} />
       <Tabs.Screen
      name="Ajustes"
      component={Ajustes}
      options={{
        tabBarLabel: 'Ajustes',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="settings" color={color} size={26} />
        ),
      }} />
  </Tabs.Navigator>
);





export default function App() {

  return (
    // screenOptions={{headerShown: false}} En la etiqueta Stack.Navigator
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gesturesEnabled: false }} >
        <Stack.Screen name="Inicio" component={InicioComponent} />
        {/* <Stack.Screen name="Principal" component={PrincipalComponent} />        */}
        <Stack.Screen name="Principal" component={TabsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
