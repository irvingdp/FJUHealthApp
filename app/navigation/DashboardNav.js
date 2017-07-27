'use strict'
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PackageScreen from '../screens/PackageScreen';
import Solution from '../screens/SolutionScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Dashboard: {screen: DashboardScreen},
    Login: {screen: LoginScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Dashboard,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const DashboardStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


