import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'

import {StyleSheet, View, Button, Text} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import Routes from '../navigation/Routes'
import LoginButton from '../componenets/LoginButton'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        title: 'Home',
        headerRight: <LoginButton/>
    };
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        go: PropTypes.func.isRequired,
    };

    render() {
        let {go, isLoggedIn} = this.props;
        return (
            <View style={styles.container}>
                <View>
                    {isLoggedIn ?
                    <View>
                        <Text style={styles.welcome}>{'You are "logged in" right now'}</Text>
                        <Button onPress={() => go(Routes.Profile)} title="Go To Profile"/>
                    </View> :
                       null
                    }
                    <Button onPress={() => go(Routes.Product)} title="Go To Product"/>
                </View>
                <LoginButton/>
            </View>
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    go: (routeName) => dispatch(ReduxNav.ActionCreator.go(routeName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

