import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import ReduxNav from '../redux/Nav'
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: 'Profile',
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Profile Screen
                </Text>
                <Text style={styles.welcome}>{this.props.isLoggedIn ? 'You are "logged in" right now.' : "You are not log in."}</Text>
                {this.props.isLoggedIn ?
                <Button
                    title={'Go to Reserve Screen'}
                    onPress={() => this.props.go(Routes.Reserve)}
                /> : null
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    go: (routeName) => dispatch(ReduxNav.ActionCreator.go(routeName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

