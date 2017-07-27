import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppLabels from '../AppLabels';
import {Layouts, Colors} from '../styles/BaseStyles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class PackageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = {
        title: AppLabels.PackageScreen.title,
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>{AppLabels.PackageScreen.title}</Text>
                </View>
            </View>
        )
    }
}

export default PackageScreen;

