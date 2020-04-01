import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput, SubmitButton, TouchableHighlight, Fragment, TouchableOpacity } from 'react-native';
// import UserStore from './UserStore';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class InicioComponent extends Component {


    constructor() {

        super()
        this.state = {
            user: '',
            paradas: []
        }

        state = {
            text: ''
        };



        //    AsyncStorage.setItem('user', 'aranza');

        AsyncStorage.getItem('user', (err, result) => {
            if (err)
                console.log("error");
            else {
                this.setState({
                    user: result
                })
            }
        });

        console.log(this.state.user)
    }

    onClearArray = () => {
        this.setState({ paradas: [] });
    };


    componentDidMount() {
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
                    console.log(this.state.paradas)
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
        // console.log(element.geometry.coordinates[0])
        //    console.log(element.geometry.coordinates)
        let parada = {
            coordenadas: geometry.coordinates,
            address: properties.address,
            available: properties.available,
            free: properties.free,
            number: properties.number,
            total: properties.total
        }
        this.state.paradas.push(parada)
    }

    

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.imagen}
                    source={require('./../assets/logo2.png')}
                />
                {this.showLogin()}
            </View>
        )
    }

    logout = () => {
        this.setState({
            user: ''
        })
        AsyncStorage.removeItem('user');
    }

    handleSubmit() {
        this.setUser()
        AsyncStorage.setItem('user', JSON.stringify(this.state.text));
    }

    setUser() {
        this.setState({
            user: this.state.text
        })
        // this.setState({ user: text })
    }

    showLogin() {
        if ((this.state.user === '') || (!this.state.user) || (this.state.user == null) || (this.state.user === "")) {
            return (
                <View style={styles.view}>
                    <Text style={styles.bienvenida}>¿Cómo te llamas?</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        label='Nombre'
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })}
                    />

                    <View style={styles.center}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={
                                () => this.handleSubmit()
                            }>
                            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}> Enviar </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            )
        }
        else {
            return (
                <View style={styles.view}>
                    <Text style={styles.bienvenida}>Bienvenid@ {this.state.user}!</Text>
                    <Button
                        title="Acceder "
                        onPress={() => this.props.navigation.navigate('Principal')}
                        style={styles.saveButtonText}

                    />

                    <Button
                        title="¿Este no es tu nombre?"
                        onPress={this.logout}
                        style={styles.saveButtonText}
                    />
                </View>
            )
        }
    }
}

export default InicioComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    imagen: {
        width: 150,
        height: 150,
        marginTop: 120,
        borderRadius: 25,
        borderColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 20,
        padding: 5
    },
    bienvenida: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        fontFamily: 'KohinoorBangla-Semibold',
        backgroundColor: '#ffffff',
    },
    pretunta: {
        fontSize: 20,
        marginTop: 25, fontWeight: 'bold',

    }, saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 20
    },
    button: {
        backgroundColor: '#ffaaa5',
        padding: 10,
        borderRadius: 5,
        color: '#fff',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    view: {
        backgroundColor: '#ffffff',

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});