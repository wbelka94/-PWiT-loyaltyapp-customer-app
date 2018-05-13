import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Header} from "react-native-elements";
import QRCode from 'react-native-qrcode';


export default class SecondScreen extends Component{
    static navigationOptions = {
        title: 'Second',
        tabBarLabel: 'Second',


    };

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Moja karta', style: {color: 'white'}}}
                    rightComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => navigate('DrawerOpen'),
                    }}
                    backgroundColor="#252525"/>
                <QRCode
                    value={"customers/123"}
                    size={200}
                    bgColor='black'
                    fgColor='white'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: -10,
        backgroundColor: '#ecf0f1',
    },

})