import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import ProfileScreen from '../screens/ProfileScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import {Colors} from '../styles/BaseStyles'
import NavBackButton from '../componenets/NavBackButton'

const routeConfiguration = {
    Profile: {screen: ProfileScreen},
    ProfileDetail: {screen: ProfileDetailScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Profile,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
        headerLeft: <NavBackButton />
    }
}
export const ProfileStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);