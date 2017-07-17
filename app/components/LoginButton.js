import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import ReduxAuth from '../redux/Auth'
import ReduxHomeNav from '../redux/HomeNav'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Routes from '../navigation/Routes'

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        go: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        let {isLoggedIn, go, logout} = this.props;
        return (
                <View>
                    {isLoggedIn ?
                        <Button onPress={() => logout()} title="Logout"/>
                     :
                        <Button onPress={() => go(Routes.Login)} title="Login"/>
                    }
                </View>
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    go: (routeName) => dispatch(ReduxHomeNav.ActionCreator.go(routeName)),
    logout: () => dispatch(ReduxAuth.ActionCreator.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);

