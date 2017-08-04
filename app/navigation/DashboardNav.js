'use strict'
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BookStep1Screen from '../screens/BookStep1Screen';
import BookStep2Screen from '../screens/BookStep2Screen';
import BookStep3Screen from '../screens/BookStep3Screen';
import BookSuccessScreen from '../screens/BookSuccessScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Dashboard: {screen: DashboardScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    BookStep1: {screen: BookStep1Screen},
    BookStep2: {screen: BookStep2Screen},
    BookStep3: {screen: BookStep3Screen},
    BookSuccessScreen: {screen: BookSuccessScreen}
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Dashboard,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const DashboardStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


