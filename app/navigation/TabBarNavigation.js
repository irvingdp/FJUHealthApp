import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, TabNavigator} from 'react-navigation';

// Tab-Navigators
import {HomeTabStackNavigator} from './HomeTabStackNavigation'
import {ReserveTabStackNavigator} from './ReserveTabNavigation'

const routeConfiguration = {
    HomeTabStackNavigator: { screen: HomeTabStackNavigator },
    ReserveTabStackNavigator: { screen: ReserveTabStackNavigator },
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

class TabBarNavigation extends Component {
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
    navigationState: state.tabBar,
});

export default connect(mapStateToProps)(TabBarNavigation);
