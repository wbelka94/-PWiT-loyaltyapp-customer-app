import React, {Component} from 'react';
import HomeScreen from "./screens/HomeScreen";
import MyPointsScreen from "./screens/MyPointsScreen";
import CompanyScreen from "./screens/CompanyScreen";
import createDrawerNavigator from "react-navigation/src/navigators/createDrawerNavigator";
import CouponScreen from "./screens/CouponScreen";
import QRScan from "./screens/QRScan";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import {Icon} from "react-native-elements";
import SignInScreen from "./screens/SignInScreen";


const MyPoints = createStackNavigator({
    Home: {
        path: '/home',
        screen: MyPointsScreen,
    },
    Company: {
        path: 'home/my-points/company',
        screen: CompanyScreen
    },
    Coupon: {
        path: 'home/my-points/company/coupon',
        screen: CouponScreen
    },
},{
    initialRouteName: 'Home',
    drawerPosition: 'right',
    headerMode: 'none',

    tabBarVisible: true,
    tabBar: {
        visible:true,
        label: 'Moje punkty'},
    navigationOptions: {

        headerMode: 'none',
        headerVisible: false,
    }
});

MyPoints.navigationOptions = {
    tabBarLabel: 'Moje punkty',
    tabBarIcon: ({ tintColor }) => (<Icon type='material-community' name={'coins'} size={25}  color={tintColor}/>)
}

const App = createBottomTabNavigator ({
    MyCard: {
        path: '/my-card',
        screen: HomeScreen,
    },
    MyPoints: {
         path: '/home/my-points',
         screen: MyPoints,
    },
    QRScan: {
        screen: QRScan
    }
});

const SignedOut = createStackNavigator({
    SignIn: {
        screen: SignInScreen,
    },
    App: {
        screen: App
    }
},{
    initialRouteName: 'SignIn',
    drawerPosition: 'right',
    headerMode: 'none',
    navigationOptions: {
        headerMode: 'none',
        headerVisible: false,
    }
});

export default SignedOut;