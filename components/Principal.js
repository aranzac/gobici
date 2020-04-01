import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default class PrincipalComponent extends Component {


    state = {
        initialRegion: {
            latitude: 39.466941,
            longitude: -0.375342,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }


    constructor() {
        super()
        this.getCurrentLocation();
    }

    async getCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(
            position => {
                let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                };
                console.log(region);
                this.setState({
                    initialRegion: region
                });
                this.mapView.animateToRegion(region, 2000);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }


  



    render() {
        return (

            <View>
            {/* <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={PrincipalComponent} />
        <Tab.Screen name="Settings" component={PrincipalComponent} />
      </Tab.Navigator>
    </NavigationContainer> */}
            <View style={styles.container}>

                <MapView style={styles.mapStyle} showsUserLocation={true} followUserLocation={true} zoomEnabled={true} initialRegion={this.state.initialRegion} ref={ref => (this.mapView = ref)}></MapView>


                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 30, marginTop: 40 }}>

                        <Text style={styles.bienvenida}>¿Cómo te llamas?</Text>


                        {/* <MapView.Callout style={styles.button} onPress={() => alert('Hello, world!')}>
                            <View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => alert('Hello, world!')}
                                >
                                    <Text>Paradas cercanas</Text>
                                </TouchableOpacity>
                            </View>
                        </MapView.Callout> */}

                        {/* <Button style={styles.saveButtonText} title="Paradas"></Button> */}
                        {/* <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button2} title="Paradas">
                            <Text>Pick a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                        >
                            <Text style={styles.countText}> Touch Here </Text>
                        </TouchableOpacity> */}
                        {/* <Button
                            title="Learn More"
                            color="#841584"
                            style={styles.button}
                            accessibilityLabel="Learn more about this purple button"
                        /> */}


                    </View>

                </View>
                {/* // Para los marcadores es la componente Marker, y se puede cambiar el icono con image*/}
            </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#d6e7cd',
        backgroundColor: '#fff',

    },
    saveButtonText: {
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute',
        backgroundColor: 'blue',
        height: 70,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36, backgroundColor: 'skyblue'
    },
    map: {
        flex: 1
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1,
        position: 'absolute'
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    },
    button: {
        backgroundColor: '#d6e7cd',
        padding: 10,
        borderRadius: 5,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});