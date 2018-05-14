import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import MyPointsScreen from "./screens/MyPointsScreen";
import CompanyScreen from "./screens/CompanyScreen";
import createDrawerNavigator from "react-navigation/src/navigators/createDrawerNavigator";

const App = createDrawerNavigator ({
    Home: {
        path: '/home',
        screen: HomeScreen,
    },
    MyPoints: {
         path: '/home/my-points',
         screen: MyPointsScreen
    },
    Company: {
        path: 'home/my-points/company',
        screen: CompanyScreen
    }
},{
    initialRouteName: 'Home',
    drawerPosition: 'right',
    navigationOptions: {
        headerMode: 'none',
    }
});

export default App;