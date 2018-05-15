import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView, Image, TouchableOpacity,
} from 'react-native';

import {Header} from "react-native-elements";


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class MyPointsScreen extends Component{
    static navigationOptions = {
        title: 'Moje punkty',
    };

    constructor() {
        super();

        this.state = {
            customer:{
                id: 1,
            },
            dataSource: ds.cloneWithRows([])
        };
        this.getPointsByCompanyFromApiAsync();
    }

    getPointsByCompanyFromApiAsync() {
        return fetch('http://loyaltyapp.fb-chn.pl/customers/' + this.state.customer.id + '/pointsByCompany', {
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
                    centerComponent={{text: 'Moje punkty', style: {color: 'white'}}}
                    rightComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => this.props.navigation.openDrawer(),
                    }}
                    backgroundColor="#252525"/>
                <View style={styles.mainContainer}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={
                            (rowData) =>
                            <TouchableOpacity
                                style={styles.rowView}
                                onPress={() => {this.props.navigation.navigate("Company",{company: rowData})}}
                            >
                                <View style={{width: 50, alignSelf: 'flex-start'}}>
                                    <Image
                                        style={{width: 50, height: 50}}
                                        source={{uri: rowData.logo != null ? rowData.logo : 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                                    />
                                </View>
                                <View style={{paddingLeft: 5}}>
                                    <Text style={styles.h2}>{rowData.name}</Text>
                                    <Text style={styles.grayText}>{rowData.points} punktów</Text>
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
    grayText:{
        color: '#707070',
    }

})