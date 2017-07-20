import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppLabels from '../AppLabels';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class GuildScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        title: AppLabels.GuildScreen.title,
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>{AppLabels.GuildScreen.title}</Text>
                </View>
            </View>
        )
    }
}

export default GuildScreen;

