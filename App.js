import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import MyPointsScreen from "./screens/MyPointsScreen";
import createDrawerNavigator from "react-navigation/src/navigators/createDrawerNavigator";

const App = createDrawerNavigator ({
    Home: {
        path: '/home',
        screen: HomeScreen,
    },
    Second: {
         path: '/home/second',
         screen: MyPointsScreen
    },
    // AddVehicle: {
    //     path: 'home/addVehicle',
    //     screen: VehicleFormScreen
    // }
},{
    initialRouteName: 'Home',
    drawerPosition: 'right',
    navigationOptions: {
        headerMode: 'none',
    }
});

export default App;