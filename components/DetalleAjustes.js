import React, { Component } from 'react';
import { Text, Alert, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

class DetalleAjustesComponent extends Component {

    constructor() {
        super()
        this.state = {
            text: '',
            user: ''
        }

        AsyncStorage.getItem('user', (err, result) => {
            if (err)
                console.log("error");
            else {
                this.setState({
                    user: JSON.parse(result)
                })
            }
        });
        this.Input = React.createRef();
    }

    setUser() {
        this.setState({
            user: this.state.text
        })
    }

    
    showAlert(result) {  
        Alert.alert(  
            'Nombre guardado',  
            'A partir de ahora te llamaremos ' + result,  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => console.log('OK Pressed')},  
            ]  
        );  
    }  

    handleSubmit() {
        this.setUser();
        this.Input.current.clear();

        console.log(this.state.text)
        AsyncStorage.setItem('user', JSON.stringify(this.state.text));
        AsyncStorage.getItem('user', (err, result) => {
            if (err)
                console.log("error");
            else {
                this.showAlert(JSON.parse(result))
            }
        });
    }

    render() {
        return (
            <View>

                <Text style={styles.text}>Nombre</Text>
                <TextInput
                    ref={this.Input}
                    clearButtonMode="always"
                    placeholder={this.state.user}
                    label='Nombre'
                    value={this.state.text}
                    style={styles.input}
                    onChangeText={text => this.setState({ text })}
                />

                <View style={styles.center}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={
                            () => this.handleSubmit()
                        }>
                        <Text style={{ fontWeight: 'bold', color: '#ffffff' }}> Guardar </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default DetalleAjustesComponent;

const styles = StyleSheet.create({

    text: {
        flex: 1,
        padding: 21,
        color: 'grey',
        fontSize: 18
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }, button: {
        backgroundColor: '#ffaaa5',
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        margin: 20,
        marginTop: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 20,
        padding: 5,
        fontSize: 18
    }
})  