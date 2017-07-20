import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import SettingScreen from '../screens/SettingScreen';

const routeConfiguration = {
    Setting: {screen: SettingScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Setting
}
export const SettingStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);