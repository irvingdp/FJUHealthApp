import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';

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

class ReserveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'Reserve',
    };
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Reserve Screen
                </Text>
                <Button
                    title={'Go to Home Screen'}
                    onPress={() => this.props.go(Routes.Home)}
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    go: (routeName) => dispatch(ReduxNav.ActionCreator.go(routeName)),
});

export default connect(null, mapDispatchToProps)(ReserveScreen);

