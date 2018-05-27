import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import MyPointsScreen from "./screens/MyPointsScreen";
import CompanyScreen from "./screens/CompanyScreen";
import createDrawerNavigator from "react-navigation/src/navigators/createDrawerNavigator";
import CouponScreen from "./screens/CouponScreen";
import QRScan from "./screens/QRScan";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";


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
    navigationOptions: {
        headerMode: 'none',
        headerVisible: false,
    }
});

const App = createBottomTabNavigator ({
    Home: {
        path: '/home',
        screen: HomeScreen,
    },
    MyPoints: {
         path: '/home/my-points',
         screen: MyPoints
    },
    QRScan: {
        screen: QRScan
    }
});



export default App;