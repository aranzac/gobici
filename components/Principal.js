import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Dimensions, TouchableOpacity, TextInput, Image, ActionButton } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const regionProvisional = {
    latitude: 39.490000,
    longitude: -0.381944,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}
export default class PrincipalComponent extends Component {

    state = {
        initialRegion: {
            latitude: 39.466941,
            longitude: -0.375342,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        paradas: [],
        loading: true
    }


    constructor(props) {
        super(props)

        this.getCurrentLocation()


    }

    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }

    calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }


    distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var radlon1 = Math.PI * lon1 / 180
        var radlon2 = Math.PI * lon2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515

        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist
    }



    componentDidMount() {
        let variable = ''
        // if(this.props.route.params.paradas.route.params.paradas)
        this.setState({
            loading: 'false'
        })
        console.log("Montando componente")
        // fetch("http://mapas.valencia.es/lanzadera/opendata/aparcabicis/JSON")
        fetch("https://data.lab.fiware.org//dataset/de72a0fb-5f50-4483-8f66-827fae17cea1/resource/e1ee9956-0796-4357-bf0c-53f398c6db20/download/valenciavalenbisi.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                    result.features.forEach(element => this.storeData(element))
                    this.setState({
                        loading: 'false'
                    })
                    console.log("mostrando")

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log("Error fetching JSON")
                }
            )

    }

    storeData(element) {
        let geometry = element.geometry;
        let properties = element.properties;
        let parada = {
            _id: properties.number,
            coordenadas: { longitud: element.geometry.coordinates[0], latitud: element.geometry.coordinates[1] },
            address: properties.address,
            available: properties.available,
            free: properties.free,
            total: properties.total,
            distancia: this.distance(regionProvisional.latitude, regionProvisional.longitude, element.geometry.coordinates[1], element.geometry.coordinates[0], 'K').toFixed(2),
            proporcion: (properties.available * 100 / properties.total).toFixed(0)
        }
        // Math.round(num * 100) /


        // if (this.state.paradas.length < 3) //Provisional
        this.state.paradas.push(parada)


    }


    async getCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(
            position => {
                // let region = {
                //     latitude: parseFloat(position.coords.latitude),
                //     longitude: parseFloat(position.coords.longitude),
                //     latitudeDelta: 0.01,
                //     longitudeDelta: 0.01
                // };

                let region = {
                    latitude: parseFloat(39.489994),
                    longitude: parseFloat(-0.381950),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }
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


    showMarkers() {
        // console.log("tam " + this.state.paradas.length)
        if (this.state.loading === 'false') {
            return (
                this.state.paradas.map(marker => (
                    <View>

                        <Marker
                            key={marker._id}
                            coordinate={{
                                latitude: marker.coordenadas.latitud,
                                longitude: marker.coordenadas.longitud
                            }}
                            title={marker.address}
                            description={marker.distancia + 'km'}
                            onPress={() => {
                                this.props.navigation.navigate("Detalle", { parada: marker });
                            }}
                        >
                            {/* <View style={styles.cone}>
                                <Text>{marker.available}</Text>
                            </View> */}
                            <Image
                                source={require('./../assets/rosa-min.png')}
                                style={styles.imagen}
                            />

                        </Marker>
                    </View>

                ))
            )
        }
    }



    render() {


        return (
            <View>
                <View style={styles.container}>
                    <MapView style={styles.mapStyle} showsUserLocation={true} followUserLocation={true} zoomEnabled={true} initialRegion={this.state.initialRegion} ref={ref => (this.mapView = ref)}>
                        {this.showMarkers()}
                        <View>

                            <Marker

                                coordinate={{
                                    latitude: '39.490000',
                                    longitude: '-0.381944'
                                }}
                                title={'casa de aran'}

                            >
                                {/* <Image
                                    source={require('./../assets/rosa-min.png')}
                                    style
                                /> */}

                            </Marker>
                        </View>
                    </MapView>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>

                        <MapView.Callout style={styles.callout} onPress={() => alert('Hello, world!')}>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.props.navigation.navigate("Paradas", { params: { paradas: this.state.paradas } });
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Todas las paradas</Text>
                            </TouchableOpacity>
                        </MapView.Callout>
                    </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        position: 'absolute',//use absolute position to show button on top of the map
        top: '50%', //for center align
        alignSelf: 'flex-end' //for align to right
    }, callout: {
        flexDirection: 'row-reverse',
        margin: 20
    },
    container: {
        flex: 1,
        // backgroundColor: '#d6e7cd',
        backgroundColor: '#fff',

    },
    imagen: {
        width: 20,
        height: 30
    },
    saveButtonText: {
        alignSelf: 'flex-end',

        position: 'absolute',
        backgroundColor: 'blue',
        height: 100,
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
        backgroundColor: '#ffaaa5',
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }, actionButton: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 10,
        left: 10,
        zIndex: 10
    },cone: {
        width: 1,
        height: 1,
        borderLeftWidth: 17,
        borderLeftColor: 'transparent',
        borderRightWidth: 17,
        borderRightColor: 'transparent',
        borderTopWidth: 30,
        // borderTopColor: 'red',
        borderRadius: 17,
        
      }
});