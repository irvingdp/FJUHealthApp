'use strict'
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import Routes from './Routes'

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const routeConfiguration = {
    Home: {screen: HomeScreen},
    Login: {screen: LoginScreen},
    Product: {screen: ProductScreen}
}
const stackNavigatorConfiguration = {
    initialRouteName: Routes.Home
}
export const HomeStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);



class HomeStackNavigation extends React.Component {
    render(){
        const { dispatch, navigationState} = this.props
        return (
            <HomeStackNavigator
                navigation={
                    addNavigationHelpers({
                        dispatch: dispatch,
                        state: navigationState
                    })
                }
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        navigationState: state.HomeNav
    }
}
export default connect(mapStateToProps)(HomeStackNavigation)