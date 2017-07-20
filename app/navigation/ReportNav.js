import React from 'react';


// Navigation
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'


import ReportScreen from '../screens/ReportScreen';

const routeConfiguration = {
    Report: {screen: ReportScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Report
}
export const ReportStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


