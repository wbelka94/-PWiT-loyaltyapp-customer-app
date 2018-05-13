import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import SecondScreen from "./screens/SecondScreen";
import createDrawerNavigator from "react-navigation/src/navigators/createDrawerNavigator";

const App = createDrawerNavigator ({
    Home: {
        path: '/home',
        screen: HomeScreen,
    },
    Second: {
         path: '/home/second',
         screen: SecondScreen
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