import ActionType from '../redux/actions'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';

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

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };
    static navigationOptions = {
        title: 'Log In',
    };
    render() {
        let {navigation} = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Screen A
                </Text>
                <Text style={styles.instructions}>
                    This is great
                </Text>
                <Button
                    onPress={() => navigation.dispatch({ type: ActionType.LOGIN })}
                    title="Log in"
                />
            </View>
        )
    }
}

export default LoginScreen;
