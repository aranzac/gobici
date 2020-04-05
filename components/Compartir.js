import React, { Component } from 'react';
import { StyleSheet, Platform, Share, Linking, View, Text, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

class CompartirComponent extends Component {

    state = {
        selectedImage: null,
        text: ''
    }

    constructor(){
        super()

        this.Input = React.createRef();

    }

    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Se necesitan permisos para abrir la galeria');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync();
        if (result.cancelled === true) {
            return;
        }

        this.setState({
            selectedImage: result.uri
        })
    };

    openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`No puedes compartir en esta plataforma`);
            return;
        }

        Sharing.shareAsync(this.state.selectedImage);
    };

    showAlert() {  
        Alert.alert(  
            'Nombre guardado',  
            [  
                 
                {text: 'Mensaje enviado', onPress: () => console.log('Mensaje enviado')},  
            ]  
        );  
    }  

    openShareTextDialogAsync = async () => {

            const result = await Share.share({
                message: this.state.text,
            })

            this.Input.current.clear();

    }


    render() {

        if (this.state.selectedImage !== null) {
            return (
                <View style={styles.container}>
                    <Image source={{ uri: this.state.selectedImage }} style={styles.thumbnail} />
                    <TouchableOpacity onPress={this.openShareDialogAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Compartir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openImagePickerAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Elegir otra imagen</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (

                <View style={styles.container}>

                    <View style={styles.panel2}>
                        <Text style={styles.texto}>
                         Cuenta tu experencia con GoBici y compártelo con tus amigos
                        </Text>
                        <TextInput
                            ref={this.Input}
                            clearButtonMode="always"
                            placeholder={this.state.text}
                            label='Nombre'
                            value={this.state.text}
                            style={styles.input}
                            onChangeText={text => this.setState({ text: text })}
                        />
                        <TouchableOpacity onPress={this.openShareTextDialogAsync} style={styles.button}>
                            <Text style={styles.buttonText}>Compartir</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.texto}>
                        Aquí puedes compartir una foto de tu experiencia con GoBici
                  </Text>

                    <TouchableOpacity onPress={this.openImagePickerAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Elegir imagen</Text>
                    </TouchableOpacity>
                </View>
            );
        }


    }
}


export default CompartirComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    texto: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    }, button: {
        backgroundColor: '#ffaaa5',
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginTop: 10
    },
    input: {
        margin: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,

        padding: 5,
        fontSize: 18,
        width: '70%'
    }, panel2: {
        marginBottom: 50,
        width: '100%',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
});
