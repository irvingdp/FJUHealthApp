import React, {Component} from 'react'
import {
    Text,
} from 'react-native'
import LockButton from '../componenets/LockButton';
import ReduxAuth from '../redux/Auth'
import {connect} from 'react-redux';

 class LogoutButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {}
    static defaultProps = {}

    render() {
        if (!this.props.isLoggedIn) {
            return null
        } else {
            return (
                <LockButton onPress={() => this.props.logout()} buttonStyle={{marginRight: 10}} >
                    <Text>Logout</Text>
                </LockButton>
            )
        }
    }
}
const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(ReduxAuth.ActionCreator.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

