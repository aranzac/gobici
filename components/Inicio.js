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
            paradas: [],
            loading: true
        }

        state = {
            text: ''
        };

        AsyncStorage.getItem('user', (err, result) => {
            if (err)
                console.log("error");
            else {
                this.setState({
                    user: JSON.parse(result)
                })
            }
        });
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
    }


    showLogin() {
        if ((this.state.user === '') || (!this.state.user) || (this.state.user == null) || (this.state.user === "")) {
            return (
                <View style={styles.view}>
                    <Text style={styles.bienvenida}>¿Cómo te llamas?</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        clearButtonMode="always"
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
                        onPress={() => {
                            this.props.navigation.navigate("Mapa", { params: { to: 1900 } });
                        }}
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