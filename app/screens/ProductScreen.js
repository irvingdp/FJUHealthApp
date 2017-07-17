import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import LoginButton from '../componenets/LoginButton'
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
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>{'Product Screen'}</Text>
                </View>
                <LoginButton/>
            </View>
        )
    }
}



export default ProductScreen;

