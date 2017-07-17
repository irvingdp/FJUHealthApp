import ActionType from '../redux/actions'

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Routes from '../navigators/Routes';

class AuthButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        loginScreen: PropTypes.func.isRequired,
    };
    render() {
        let { logout, loginScreen, isLoggedIn } = this.props;
        return(
            <Button
                title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
                onPress={isLoggedIn ? logout : loginScreen}
            />
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn,});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: ActionType.LOGOUT }),
  loginScreen: () => dispatch(NavigationActions.navigate({ routeName: Routes.getRouteName(Routes.Screens.Login) })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
