import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, TextInput, KeyboardAvoidingView, Button, TouchableOpacity
} from 'react-native';

import {Header, Icon} from "react-native-elements";
import QRCode from 'react-native-qrcode';

export default class SignInScreen extends Component{

    constructor(){
        super();
        this.state = {
            customer: {
                id: 1,
            },
        };
        AsyncStorage.getItem('customer')
            .then((customer) => {
                if (customer != null) {
                    this.setState({customer: JSON.parse(customer)});
                }
                else {
                    this.getCustomerFromApiAsync(this);
                }
            });
    }

    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.mainContainer}>

                        <Text style={styles.title}>LoyalytyApp</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Adres e-mail"}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"Hasło"}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{this.props.navigation.navigate("App")}}
                        >
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',}}
                            >Zaloguj się</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0000',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
        justifyContent: 'center'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    input: {
        width: '75%',
        height: 40,
        marginTop: 5,
        backgroundColor: '#ff6e64',
        padding: 5,
        color: 'white',
    },
    button:{
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#a20000',
        width: '75%',
        height: 40,
    }

})