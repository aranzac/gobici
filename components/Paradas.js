import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Header, Button, TouchableOpacity, Icon, TouchableOpacityComponent } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
class ParadasComponent extends Component {

    state = {
        paradas: {},
        loading: true,
        sorted: false,
        ordenadas: {},
        desordenadas: {}
    }

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Settings'
    })


    sort(array) {

        array.sort(function (a, b) {
            return a.distancia - b.distancia;
        });

        return array
    }

    componentDidMount() {
        if (this.props.route.params.params.paradas) {
            var clone = this.props.route.params.params.paradas.slice(0);
            clone.sort(function (a, b) {
                return a.parada.distancia - b.parada.distancia;
            });
            this.setState({
                paradas: this.props.route.params.params.paradas.sort(function (a, b) {
                    return a.parada._id - b.parada._id;
                }),
                loading: 'false',
                ordenadas: clone.slice(0, 5),
                desordenadas: this.props.route.params.params.paradas
            })
        }
    }

    getListViewItem = (item) => {
        Alert.alert(item.parada.address);
    }


    toggle() {
        this.setState({
            sorted: !this.state.sorted
        })
    }

    color(item, bicis){
        var prop = item.proporcion

        if(prop == 'NaN')
        return 'lightgrey'

        if(!bicis){
            prop = 100 - prop
        }
        // if(prop == 0)
        //     return 'black'
         if(prop<=25)
            return 'red'
            else if(prop < 50)
                return 'orange'
                else if(prop <=100)
                return 'green'
    }

    // onPress={this.getListViewItem.bind(this, item)}
    showParadas() {
        let red= 'red'
        if (this.state.loading == 'false') {
            let contenido = ''
            if (this.state.sorted)
                contenido = this.state.ordenadas
            else
                contenido = this.state.desordenadas
            return (
                <FlatList style={styles.flat}  data={contenido} renderItem={({ item }) =>
                    <TouchableOpacity style={styles.item} key={item.parada._id}  onPress={() => {
                        this.props.navigation.navigate("Detalle",  { parada: item.parada } );
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ justifyContent: 'column',padding: 5,marginLeft: 5, maxWidth: '70%' }}>
                                <Text style={{flexDirection: 'row', marginLeft: 2, marginBottom: 2, fontSize: 15 }}><MaterialCommunityIcons style={{ alignSelf: 'flex-start', padding: 10 }} name="bike" color={this.color(item.parada, true)} size={19} /> {item.parada.available}&nbsp; <MaterialCommunityIcons style={{ alignSelf: 'flex-start' }} name="anchor" color={this.color(item.parada, false)} size={18} />{item.parada.free}</Text>
                                <Text>{item.parada._id}. {item.parada.address}</Text>  
                            </View>
                            <Text style={styles.distance}>{item.parada.distancia} km</Text>
                        </View>
                    </TouchableOpacity>
                } />
            )
        }
    }

    mostrar() {
        if (!this.state.sorted)
            return this.cercanas()
        else
            return this.nocercanas()
    }

    cercanas() {
        return (
            <Text><Text style={styles.sort}><MaterialCommunityIcons name="sort-ascending" color={'grey'} size={20} />&nbsp;Ordenar por estaciones más cercanas</Text></Text>
        )
    }

    nocercanas() {
        return (
            <Text><Text style={styles.sort}><MaterialCommunityIcons name="format-list-bulleted" color={'grey'} size={20} />&nbsp;Ver todas las paradas</Text></Text>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ backgroundColor: '#FFE1DF', padding: 20 }} onPress={() => { this.toggle() }}>
                    {this.mostrar()}
                </TouchableOpacity>
                {this.showParadas()}
            </View>
        )
    }
}

export default ParadasComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    flat: {
        borderWidth: 1,

    },
    item: {
        padding: 10,
        fontSize: 15,
        // borderWidth: 1,
        borderColor: 'grey',
        maxWidth: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    distance: {
        padding: 10,
        fontSize: 16,
        borderColor: 'lightgrey',
        color: 'grey'    },
    sort: {
        padding: 13,
        fontSize: 15,
        color: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
        flexGrow: 1
    },
    pequeno: {
        padding: 10
    }

})  