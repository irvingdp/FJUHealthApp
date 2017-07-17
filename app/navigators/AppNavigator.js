import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation';
import Routes from './Routes';

export const AppNavigator = StackNavigator(Routes.Screens);
//export const AppNavigator = TabNavigator(Routes.Screens);

class AppWithNavigationState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    }

    render() {
        let {dispatch, nav} = this.props;
        return (
            <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
