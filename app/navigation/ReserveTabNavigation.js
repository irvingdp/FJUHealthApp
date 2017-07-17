import React, {Component} from 'react';

// React
import {connect} from 'react-redux';

// Navigation
import {StackNavigator, addNavigationHelpers} from 'react-navigation';

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'

import ReserveScreen from '../screens/ReserveScreen';

const routeConfiguration = {
    Reserve: {screen: ReserveScreen},
}
const stackNavigatorConfiguration = {
    initialRouteName: 'Reserve'
}
export const ReserveTabStackNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration);

class ReserveTabNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        tabBarLabel: 'Reserve',
        tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'rocket' } color={ tintColor }/>
    }
    render() {
        const { dispatch, navigationState } = this.props;
        return (
            <ReserveTabStackNavigator
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
    navigationState: state.reserveTab,
});

export default connect(mapStateToProps)(ReserveTabNavigation);
