'use strict'
import React, {Component} from 'react';

// React
import {connect} from 'react-redux';

// Navigation
import {addNavigationHelpers, StackNavigator} from 'react-navigation';

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const routeConfiguration = {
    Home: {screen: HomeScreen},
    Login: {screen: LoginScreen},
    Profile: {screen: ProfileScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: 'Home'
}
export const HomeTabStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);


class HomeTabNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
    }
    render() {
        const { dispatch, navigationState } = this.props;
        return (
            <HomeTabStackNavigator
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
    navigationState: state.homeTab,
});

export default connect(mapStateToProps)(HomeTabNavigation);
