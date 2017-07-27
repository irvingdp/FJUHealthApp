import React from 'react';
import {StackNavigator} from 'react-navigation';
import Routes from './Routes'
import InstructionScreen from '../screens/InstructionScreen';
import {Layouts, Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Instruction: {screen: InstructionScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Instruction,
    navigationOptions: {
        headerStyle: {backgroundColor: Colors.white},
        headerTitleStyle: {color: Colors.green},
    }
}
export const InstructionStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);