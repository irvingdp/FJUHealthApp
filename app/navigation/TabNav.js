import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigators
import {HomeStackNavigator} from './HomeNav'
import {ReserveStackNavigator} from './ReserveNav'
import {ProfileStackNavigator} from './ProfileNav'


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
    Reserve: {
        screen: ReserveStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Reserve',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-settings' : 'ios-settings-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Profile: {
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-settings' : 'ios-settings-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
}
const tabBarConfiguration = {
    //...other configs
    tabBarOptions:{
        activeTintColor: 'white',  // tint color is passed to text and icons (if enabled) on the tab bar
        inactiveTintColor: 'blue',
        activeBackgroundColor: 'blue', // background color is for the tab component
        inactiveBackgroundColor: 'white',
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
