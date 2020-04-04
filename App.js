import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioComponent from './components/Inicio'
import PrincipalComponent from './components/Principal'
import ParadasComponent from './components/Paradas'
import AjustesComponent from './components/Ajustes'
import CompartirComponent from './components/Compartir'
import DetalleAjustesComponent from './components/DetalleAjustes'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getProvidesAudioData } from 'expo/build/AR';
import DetalleParadaComponent from './components/DetalleParada';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const ParadasStack = createStackNavigator();
const CompartirStack = createStackNavigator();
const AjustesStack = createStackNavigator();


// const Paradas = (route) => (
//   <ParadasStack.Navigator>
//     <ParadasStack.Screen initialParams={{ paradas: route }} name="Todas las paradas" component={ParadasComponent} />
//   </ParadasStack.Navigator>
// );

const MapaMasParadas = () => (
  <ParadasStack.Navigator>
    <ParadasStack.Screen name="Mapa" options={{ headerLeft: () => null, headerShown: false }} component={PrincipalComponent} />
    <ParadasStack.Screen name="Paradas" component={ParadasComponent} />
    <ParadasStack.Screen name="Detalle" component={DetalleParadaComponent} />

  </ParadasStack.Navigator>
);

const Compartir = () => (
  <CompartirStack.Navigator>
    <CompartirStack.Screen name="Compartir" component={CompartirComponent} />
  </CompartirStack.Navigator>
);

const Ajustes = () => (
  <AjustesStack.Navigator>
    <AjustesStack.Screen name="Ajustes" component={AjustesComponent} />
    <AjustesStack.Screen name="Mis datos" component={DetalleAjustesComponent} />
  </AjustesStack.Navigator>
);


let paradas = [];







// // fetch("http://mapas.valencia.es/lanzadera/opendata/aparcabicis/JSON")
// fetch("https://data.lab.fiware.org//dataset/de72a0fb-5f50-4483-8f66-827fae17cea1/resource/e1ee9956-0796-4357-bf0c-53f398c6db20/download/valenciavalenbisi.json")
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log("_______________________________________________")

//       result.features.forEach(element => storeData(element))
//       // console.log("____________")
//       // console.log(paradas[0])
//       // console.log("____________")
//     },
//     (error) => {
//       this.setState({
//         isLoaded: true,
//         error
//       });
//       console.log("Error fetching JSON")
//     }
//   )


  var updatedData = "valor inicial"

// function callbackFunction(childData) {
//   console.log("se ha obtenido -- " + childData)
//   updatedData = childData
//   return childData
// }

function callbackFunction(childData) {
  console.log("se ha obtenido -- " + childData)
  updatedData = childData
  return childData
}

function getEstado(){
  return updatedData
}

export default function App() {


  const TabsScreen = (route) => (
    <Tabs.Navigator tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
      screenOptions={({ route })}>
        <Tabs.Screen
        name="Mapa"
        component={MapaMasParadas}
        options={{
          headerShown: false,
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }} />
      {/* <Tabs.Screen
        name="Mapa"
        component={PrincipalComponent}
        // initialParams={{ paradas: route}}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }} /> */}
      {/* <Tabs.Screen
        name="Paradas"
        component={Paradas}
        // initialParams={{ paradas: route }}
        options={{
          tabBarLabel: 'Paradas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }} /> */}
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



  return (
    // screenOptions={{headerShown: false}} En la etiqueta Stack.Navigator
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Inicio" component={InicioComponent} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Mapa" initialParams={{ paradas: paradas}} options={{ headerLeft: () => null, headerShown: false }} component={TabsScreen} /> */}
        <Stack.Screen name="Mapa" options={{ headerLeft: () => null, headerShown: false }} component={TabsScreen} />

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
