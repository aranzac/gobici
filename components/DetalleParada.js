import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
class DetalleParadaComponent extends Component {

    state = {
        parada: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.setState({
            parada: this.props.route.params.parada
        })
    }
    render() {
        return (
            <View >
                <View style={styles.item}>
                    <Text style={styles.titulo}>Parada nº {this.state.parada._id}. {this.state.parada.address}</Text>
                    <Text style={styles.texto}>Puestos totales:  {this.state.parada.total}</Text>
                    <Text style={styles.texto}>Bicicletas disponibles:  {this.state.parada.available}</Text>
                    <Text style={styles.texto}>Puestos disponibles:  {this.state.parada.free}</Text>
                    <Text style={styles.texto}>Distancia hasta parada:  {this.state.parada.distancia} km</Text>
                    <Text style={styles.texto}>Latitud: {this.props.route.params.parada.coordenadas.latitud}</Text> 
                    <Text style={styles.coordenadas}> Longitud:  {this.props.route.params.parada.coordenadas.longitud}</Text>
                </View>

            </View>
        );
    }
}
export default DetalleParadaComponent;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 1
    },
    item: {
        padding: 25,
        fontSize: 16,
        // height: 60,  
        borderWidth: 2,
        borderColor: 'lightgrey',
    },
    texto: {
        fontSize: 16,
        marginTop: 20,
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',textAlign: "center",
    },
    coordenadas:{
        fontSize: 16,
        alignSelf: 'center'
    }
})  