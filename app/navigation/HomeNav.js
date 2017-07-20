'use strict'
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import GuildScreen from '../screens/GuildScreen';
import Solution from '../screens/SolutionScreen';

const routeConfiguration = {
    Home: {screen: HomeScreen},
    Login: {screen: LoginScreen},
    Guild: {screen: GuildScreen},
    Solution: {screen: Solution}
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Home
}
export const HomeStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


