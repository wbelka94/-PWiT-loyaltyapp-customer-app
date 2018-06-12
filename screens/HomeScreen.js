import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, TouchableOpacity
} from 'react-native';

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

    signOut(){
        AsyncStorage.removeItem("customer").then(() => {
            this.props.navigation.navigate("SignIn");
        });
    }


    render(){
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{
                        text: 'Moja karta',
                        style: {
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    }}
                    rightComponent={
                        <TouchableOpacity
                            onPress={this.signOut.bind(this)}
                        >
                            <Icon type='material-community' name={'logout'} size={25} color={'white'}/>
                        </TouchableOpacity>
                    }
                    backgroundColor="#FF0000"/>
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
        backgroundColor: 'white',
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