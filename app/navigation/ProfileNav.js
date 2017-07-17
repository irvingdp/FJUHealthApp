import React, {Component} from 'react';

import {connect} from 'react-redux';

import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import Routes from './Routes'

import ProfileScreen from '../screens/ProfileScreen';

const routeConfiguration = {
    Profile: {screen: ProfileScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Profile
}
export const ProfileStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);

