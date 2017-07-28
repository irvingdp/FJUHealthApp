import React, {Component} from 'react';
import {
    View,
    Image,
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'


export default class Header extends Component {
    render() {
        return (
            <View style={{
                paddingLeft: 25,
                paddingRight: 25,
                paddingBottom: 30,
                paddingTop: 50,
                backgroundColor: Colors.white
            }}>
                <Image
                    source={require('../res/images/nav-logo.png')}
                    resizeMode={"contain"}
                />
            </View>
        )
    }
}