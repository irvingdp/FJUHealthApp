import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, TabNavigator, TabBarBottom, } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigators
import {HomeStackNavigator} from './HomeNav'
import {GuildStackNavigator} from './GuildNav'
import {TrafficStackNavigator} from './TrafficNav'
import {ReportStackNavigator} from './ReportNav'
import {SettingStackNavigator} from './SettingNav'
import {
    Platform
} from 'react-native';

import {Colors} from '../styles/BaseStyles'

const routeConfiguration = {
    Home: {
        screen: HomeStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Guide: {
        screen: GuildStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Guide',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Traffic: {
        screen: TrafficStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Traffic',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-pin' : 'ios-pin-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Report: {
        screen: ReportStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Report',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-paper' : 'ios-paper-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Setting: {
        screen: SettingStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Setting',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-menu' : 'ios-menu-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
}
const tabBarConfiguration = {
    //...other configs
    tabBarPosition: 'bottom',
    tabBarOptions:{
        showIcon: true,
        showLabel: false,
        activeTintColor: Colors.black,  // tint color is passed to text and icons (if enabled) on the tab bar
        inactiveTintColor: (Platform.OS === 'ios') ? Colors.white : Colors.black,

        activeBackgroundColor: Colors.black, // background color is for the tab component
        inactiveBackgroundColor: Colors.white,

        style: {
            backgroundColor:   Colors.white
        },
        tabStyle: {
        },
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
