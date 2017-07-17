import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
            </View>
        )
    }
}

export default ProfileScreen;
