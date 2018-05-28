import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Header, Icon} from "react-native-elements";
import QRCode from 'react-native-qrcode';

export default class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Moja karta',
        tabBarLabel: 'Moja karta',
        tabBarIcon: ({ tintColor }) => (<Icon type='MaterialIcons' name={'card-giftcard'} size={25}  color={tintColor}/>)
    };

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

    getCustomerFromApiAsync() {
        return fetch('http://loyaltyapp.fb-chn.pl/customers/' + this.state.customer.id, {
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

    render(){
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Moja karta', style: {color: 'white'}}}
                    // rightComponent={{
                    //     icon: 'menu',
                    //     color: '#fff',
                    //     onPress: () => this.props.navigation.openDrawer(),
                    // }}
                    backgroundColor="#252525"/>
                <View style={styles.mainContainer}>
                    <QRCode
                        style={styles.QRCode}
                        value={"customers/"+this.state.customer.id}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                    <Text style={{fontSize: 25}}>{this.state.customer.id}</Text>
                    <View style={styles.detailView}>
                        <Text>{this.state.customer.firstname} {this.state.customer.lastname}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
    },
    QRCode:{
        margin: 25,
    },
    detailView:{
        width: '100%',
        padding: 25,
    }

})