import ReduxAuth from '../redux/Auth'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
    };
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        let {login} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    input your name...
                </Text>
                <Text style={styles.welcome}>
                    input your password...
                </Text>
                <Button onPress={login} title="Login"/>
            </View>
        )
    }
}

const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(ReduxAuth.ActionCreator.login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
