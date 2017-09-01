import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import ProfileScreen from '../screens/ProfileScreen';
import {Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Profile: {screen: ProfileScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Profile,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const ProfileStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);