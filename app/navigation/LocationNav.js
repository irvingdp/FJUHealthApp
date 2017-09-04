import React from 'react';
import {Layouts, Colors} from '../styles/BaseStyles'
import NavBackButton from '../componenets/NavBackButton'

// Navigation
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'


import LocationScreen from '../screens/LocationScreen';

const routeConfiguration = {
    Location: {screen: LocationScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Location,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
        headerLeft: <NavBackButton />
    }
}
export const LocationStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


