import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import PackageScreen from '../screens/PackageScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Package: {screen: PackageScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Package,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const PackageStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);