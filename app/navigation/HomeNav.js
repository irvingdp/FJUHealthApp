'use strict'
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const routeConfiguration = {
    Home: {screen: HomeScreen},
    Login: {screen: LoginScreen},
    Product: {screen: ProductScreen}
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Home
}
export const HomeStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


