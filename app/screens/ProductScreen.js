import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'
import ReduxAuth from '../redux/Auth'

import {StyleSheet, View, Button, Text} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import Routes from '../navigation/Routes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        title: 'Product',
    };

    render() {
        let {logout, go, isLoggedIn} = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>{'Product Screen'}</Text>
                </View>
                <Button
                    title={isLoggedIn ? 'Log Out' : 'Go to Login Screen'}
                    onPress={isLoggedIn ? () => logout() : () => go(Routes.Login)}
                />
            </View>
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    go: (routeName) => dispatch(ReduxNav.ActionCreator.go(routeName)),
    logout: () => dispatch(ReduxAuth.ActionCreator.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

