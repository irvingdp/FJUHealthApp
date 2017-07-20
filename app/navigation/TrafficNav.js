import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import TrafficScreen from '../screens/TrafficScreen';

const routeConfiguration = {
    Traffic: {screen: TrafficScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Traffic
}
export const TrafficStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);