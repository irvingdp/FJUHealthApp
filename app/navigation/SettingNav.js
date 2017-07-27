import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import SettingScreen from '../screens/SettingScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Setting: {screen: SettingScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Setting,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const SettingStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);