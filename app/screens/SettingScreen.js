import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';
import AppLabels from '../AppLabels';

import Routes from '../navigation/Routes'
import {Layouts, Colors} from '../styles/BaseStyles'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        title: AppLabels.SettingScreen.title,
    };
    render() {
        return(
            <View style={styles.container}>
                <Text>{AppLabels.SettingScreen.title}</Text>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    navigate: (routeName) => dispatch(ReduxNav.ActionCreator.navigate(routeName)),
});

export default connect(null, mapDispatchToProps)(SettingScreen);

