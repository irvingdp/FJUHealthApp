'use strict'
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BookScreen from '../screens/BookScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Dashboard: {screen: DashboardScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    Book: {screen: BookScreen}
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Dashboard,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const DashboardStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


