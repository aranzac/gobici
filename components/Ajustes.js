import React, { Component } from 'react';
import { Text, View, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

class AjustesComponent extends Component {
    constructor(props) {
        super(props)

    }


    getListViewItem = (item) => {  
        this.props.navigation.navigate(item.dest);
    }  

    render() {
        return (
            <View>
                {/* <Button
                    title="Mis datos"
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate("Misdatos", { name: "React Native by Example " });
                    }}
                /> */}
                <FlatList
                    data={[
                        { key: 'Mis datos', icon: '', dest: 'Mis datos' },
                    ]}
                    renderItem={({ item }) =>
                        <Text style={styles.item} onPress={this.getListViewItem.bind(this, item)}> <MaterialCommunityIcons name="account" color={'#e91e63'} size={35} />&nbsp;{item.key} </Text>}
                    ItemSeparatorComponent={this.renderSeparator}
                />


            </View>
        );
    }
}
export default AjustesComponent;


const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: 'white',
        marginTop: 1
    },  
    item: {  
        padding: 18,  
        fontSize: 18,  
        // height: 60,  
        borderWidth:2,
        borderColor: 'lightgrey'    },  
})  