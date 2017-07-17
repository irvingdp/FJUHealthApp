import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Routes from '../navigators/Routes';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class LoginStatusMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    render() {
        let { isLoggedIn, dispatch } = this.props;
        if (!isLoggedIn) {
            return <Text>Please log in</Text>;
        }
        return(
            <View>
                <Text style={styles.welcome}>
                    {'You are "logged in" right now'}
                </Text>
                <Button
                    onPress={() =>
                        dispatch(NavigationActions.navigate({ routeName: Routes.getRouteName(Routes.Screens.Profile) }))}
                    title="Profile"
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(LoginStatusMessage);
