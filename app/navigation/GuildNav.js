import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import GuildScreen from '../screens/GuildScreen';

const routeConfiguration = {
    Guild: {screen: GuildScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Guild
}
export const GuildStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);