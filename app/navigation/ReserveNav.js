import React, {Component} from 'react';

// React
import {connect} from 'react-redux';

// Navigation
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import Routes from './Routes'


import ReserveScreen from '../screens/ReserveScreen';

const routeConfiguration = {
    Reserve: {screen: ReserveScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Reserve
}
export const ReserveStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


