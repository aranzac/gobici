import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, TextInput, TouchableHighlight, Fragment, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

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
                <View style={{flexDirection: 'row'}}></View>
                <Text style={styles.logo}>Go<Text style={styles.logo2}>Bici</Text></Text>

                <Image
                    style={styles.imagen}
                    source={require('./../assets/logoo2.png')}
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
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'stretch',
    },
    imagen: {
        width: 150,
        height: 150,
        // marginTop: 120,
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
        marginTop: 25,
         fontWeight: 'bold',

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
        // width: ,
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
    },
    logo:{
        fontSize: 50,   
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'KohinoorBangla-Semibold',
        backgroundColor: '#ffffff',
    },
    logo2:{
        fontSize: 50,   
        fontWeight: 'bold',
        color: '#FFAAA5',
        fontFamily: 'KohinoorBangla-Semibold',
        backgroundColor: '#ffffff',
    }
});