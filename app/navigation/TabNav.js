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
    Image,
} from 'react-native';

import {Colors} from '../styles/BaseStyles'
import DeviceStore from '../DeviceStore'
import ReduxAuth from '../redux/Auth'
import Spinner from '../componenets/Spinner'

const routeConfiguration = {
    Dashboard: {
        screen: DashboardStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/dashboard-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/dashboard-tabbar-icon.png')}/>
            },
        },
    },
    Package: {
        screen: PackageStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Package',
            tabBarIcon: ({ tintColor, focused }) => {
            return focused ? <Image source={require('../res/images/package-tabbar-active-icon.png')}/> :
                <Image resizeMode="contain" source={require('../res/images/package-tabbar-icon.png')}/>
            },
        },
    },
    Instruction: {
        screen: InstructionStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Instruction',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/instruction-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/instruction-tabbar-icon.png')}/>
            },
        },
    },
    Location: {
        screen: LocationStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Location',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/location-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/location-tabbar-icon.png')}/>
            },
        },
    },
    Setting: {
        screen: SettingStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor, focused }) => {
                return focused ? <Image source={require('../res/images/settings-tabbar-active-icon.png')}/> :
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

        activeBackgroundColor: Colors.white,
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
        this.state = {
            initialized: false
        };
    }
    componentWillMount() {
        DeviceStore.loadUserData().then(data => {
            if(data && data.token) {
                return this.props.isValidToken(data.token);
            } else {
                return DeviceStore.saveUserData(null);
            }
        }).then(() => {
            this.setState({initialized: true})
        }).catch(() => {
            this.setState({initialized: true})
        })
    }
    render() {
        if(!this.state.initialized) {
            <Spinner />;
        }
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

const mapDispatchToProps = dispatch => ({
    isValidToken: (token) => dispatch(ReduxAuth.ActionCreator.isValidToken({token})),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNav);

