import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, Image,
} from 'react-native';

import {Header, Icon} from "react-native-elements";
import Hidden from "../components/Hidden";
import QRCode from "react-native-qrcode";

export default class CouponScreen extends Component{
    static navigationOptions = {
        drawerLabel: <Hidden/>
    };

    constructor(props) {
        super(props);
        this.state = {
            company: props.navigation.state.params.company,
            coupon: props.navigation.state.params.coupon,
            customer:{
                id: 0,
            }
        };
        this.state.QRCode = {
            customer: this.state.customer.id,
            coupon: this.state.coupon.id,
            company: this.state.company.id,
        }
        AsyncStorage.getItem('customer').then(
            (customer) => {
                this.setState({customer: JSON.parse(customer)});
                console.log("loading customer from asyncStorage");
                console.log(this.state.customer);
            }
        ).catch((error) => {
            console.error(error);
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'chevron-left',
                        color: '#fff',
                        onPress: () => navigate('Company',{company: this.state.company}),
                    }}
                    centerComponent={{
                        text:  this.state.company.name + " - kupon" ,
                        style: {
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    }}

                    backgroundColor="#ff0000"/>
                <View style={styles.mainContainer}>
                    <View
                        style={styles.rowView}
                    >
                        <View style={{width: 50, alignSelf: 'flex-start'}}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: this.state.coupon.icon != null ? this.state.coupon.icon : 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                            />
                        </View>
                        <View style={{paddingLeft: 5}}>
                            <Text style={styles.h2}>{this.state.coupon.title}</Text>
                            <Text style={styles.redText}>{this.state.coupon.value} punktów</Text>
                        </View>
                    </View>
                    <View style={styles.couponDetails}>
                        <Icon
                            name='info'
                            color='black' />
                        <Text style={{paddingTop: 2}}>{this.state.coupon.description}</Text>
                    </View>
                    <QRCode
                        style={styles.QRCode}
                        value={JSON.stringify(this.state.QRCode)}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                    <Text>Customer: {this.state.customer.id}</Text>
                    <Text>Coupon: {this.state.coupon.id}</Text>
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
        backgroundColor: 'white',
    },
    listView:{
        width: '100%',
    },
    rowView:{
        width: '100%',
        padding: 5,
        borderBottomWidth: 0.5,
        borderColor: '#252525',
        flexDirection: 'row',
    },
    h2:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    redText:{
        color: 'red',
    },
    couponDetails:{
        flexDirection: 'row',
        padding: 5,
        width: '100%',
    },
    QRCode:{
        marginTop: 25,
    }
})