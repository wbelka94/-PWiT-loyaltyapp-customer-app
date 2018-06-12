import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, TextInput, KeyboardAvoidingView, Button, TouchableOpacity
} from 'react-native';

import {Header, Icon} from "react-native-elements";
import QRCode from 'react-native-qrcode';

export default class SignUpScreen extends Component{

    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
        };
        AsyncStorage.getItem('customer')
            .then((customer) => {
                if (customer != null) {
                    this.props.navigation.navigate("App");
                }
                else{
                    this.setState({render: true});
                }
            });
    }

    getCustomerFromApiAsync() {
        return fetch('http://loyaltyapp.fb-chn.pl/customers/1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({customer: responseJson});
                AsyncStorage.setItem('customer',JSON.stringify(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    signUp(){
        if(this.state.password == this.state.passwordRepeat) {
            return fetch('http://loyaltyapp.fb-chn.pl/customers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customers: {
                        email: this.state.email,
                        password: this.state.password
                    }
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.errorMessage != null){
                        alert(responseJson.errorMessage);
                    }
                    else {
                        this.props.navigation.navigate('SigIn');
                        alert("Pomyślnie utworzono konto");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else{
            alert("Podane hasła nie są identyczne");
        }

    }

    render(){
        if(!this.state.render){
            return <View style={styles.container}/>;
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.mainContainer}>

                        <Text style={styles.title}>LoyaltyApp</Text>
                        <Text style={styles.subTitle}>Rejestracja</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Adres e-mail"}
                            keyboardType={"email-address"}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'none'}
                            value={this.state.email}
                            onChangeText={(value) => {this.setState({email: value})}}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"Hasło"}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={(value) => {this.setState({password: value})}}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"Powtórz hasło"}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry
                            value={this.state.passwordRepeat}
                            onChangeText={(value) => {this.setState({passwordRepeat: value})}}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.signUp.bind(this)}
                        >
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',}}
                            >Zarejestruj się</Text>
                        </TouchableOpacity>
                        <Text
                            style={{color: "white"}}
                            onPress={() => this.props.navigation.navigate("SignIn")}
                        >Logowanie</Text>
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
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    subTitle: {
        marginBottom: 20,
        fontSize: 20,
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