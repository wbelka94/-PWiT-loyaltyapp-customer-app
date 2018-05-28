import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView, Image, TouchableOpacity,
} from 'react-native';

import {Header} from "react-native-elements";
import Hidden from "../components/Hidden";


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CompanyScreen extends Component{
    static navigationOptions = {
        drawerLabel: <Hidden/>
    };

    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.company);
        this.state = {
            company: props.navigation.state.params.company,
            dataSource: ds.cloneWithRows([])
        };
        this.getCouponsForCompanyFromApiAsync();
    }

    getCouponsForCompanyFromApiAsync() {
        return fetch('http://loyaltyapp.fb-chn.pl/coupons?filter[company]=' + this.state.company.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({dataSource: ds.cloneWithRows(responseJson)});
            })
            .catch((error) => {
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
                        onPress: () => navigate('Home'),
                    }}
                    centerComponent={{text: this.state.company.name, style: {color: 'white'}}}
                    // rightComponent={{
                    //     icon: 'menu',
                    //     color: '#fff',
                    //     onPress: () => this.props.navigation.openDrawer(),
                    // }}
                    backgroundColor="#252525"/>
                <View style={styles.mainContainer}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={
                            (rowData) =>
                                <TouchableOpacity
                                    style={styles.rowView}
                                    onPress={() => {this.props.navigation.navigate("Coupon",{coupon: rowData, company: this.state.company})}}
                                >
                                    <View style={{width: 50, alignSelf: 'flex-start'}}>
                                        <Image
                                            style={{width: 50, height: 50}}
                                            source={{uri: rowData.icon != null ? rowData.icon :  'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                                        />
                                    </View>
                                    <View style={{paddingLeft: 5}}>
                                        <Text style={styles.h2}>{rowData.title}</Text>
                                        <Text style={styles.redText}>{rowData.value} punktów</Text>
                                    </View>
                                </TouchableOpacity>
                        }
                    />
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
    }

})