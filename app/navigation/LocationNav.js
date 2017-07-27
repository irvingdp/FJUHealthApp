import React from 'react';
import {Layouts, Colors} from '../styles/BaseStyles'


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
    }
}
export const LocationStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


