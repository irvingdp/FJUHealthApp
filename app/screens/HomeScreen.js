import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

import LoginStatusMessage from '../components/LoginStatusMessage';
import AuthButton from '../components/AuthButton';

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
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'Home Screen',
    };
    render() {
        return(
            <View style={styles.container}>
                <LoginStatusMessage />
                <AuthButton />
            </View>
        )
    }
}



export default HomeScreen;
