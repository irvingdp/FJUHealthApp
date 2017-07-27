import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, TabNavigator, TabBarBottom, } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLabels from '../AppLabels';

// Navigators
import {DashboardStackNavigator} from './DashboardNav'
import {PackageStackNavigator} from './PackageNav'
import {InstructionStackNavigator} from './InstructionNav'
import {LocationStackNavigator} from './LocationNav'
import {SettingStackNavigator} from './SettingNav'
import {
    Platform,
    Image,
} from 'react-native';

import {Colors} from '../styles/BaseStyles'

//TODO: Ivan replace the tab icons
const routeConfiguration = {
    Dashboard: {
        screen: DashboardStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/dashboard-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/dashboard-tabbar-active-icon.png')}/>
            },
        },
    },
    Package: {
        screen: PackageStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Package',
            tabBarIcon: ({ tintColor, focused }) => {
            return focused ? <Image source={require('../res/images/package-tabbar-icon.png')}/> :
                <Image resizeMode="contain" source={require('../res/images/package-tabbar-icon.png')}/>
            },
        },
    },
    Instruction: {
        screen: InstructionStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Instruction',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/instruction-tabbar-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/instruction-tabbar-icon.png')}/>
            },
        },
    },
    Location: {
        screen: LocationStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Location',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/location-tabbar-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/location-tabbar-icon.png')}/>
            },
        },
    },
    Setting: {
        screen: SettingStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/settings-tabbar-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/settings-tabbar-icon.png')}/>
            },
        },
    },
}
const tabBarConfiguration = {
    //...other configs
    tabBarPosition: 'bottom',
    tabBarOptions:{
        showIcon: true,
        showLabel: true,
        activeTintColor: Colors.green,  // tint color is passed to text and icons (if enabled) on the tab bar
        inactiveTintColor: Colors.lightGrey,

        activeBackgroundColor: Colors.tmp, // background color is for the tab component
        inactiveBackgroundColor: Colors.white,

        style: {
            backgroundColor:   Colors.white,
            height: 50,
        },
        tabStyle: {
            paddingTop: 6,
            paddingBottom: 2
        },
        labelStyle: {
        }
    }
}
export const TabBarNavigator = TabNavigator(routeConfiguration,tabBarConfiguration);

class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { dispatch, navigationState } = this.props;
        return (
            <TabBarNavigator
                navigation={
                    addNavigationHelpers({
                        dispatch: dispatch,
                        state: navigationState,
                    })
                }
            />
        )
    }
}

const mapStateToProps = state => ({
    navigationState: state.Nav,
});

export default connect(mapStateToProps)(TabNav);
