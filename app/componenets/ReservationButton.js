import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton';
import {connect} from 'react-redux';
import Routes from '../navigation/Routes';
import ReduxNav from '../redux/Nav'

class ReservationButton extends Component {
    render() {
        return (
            <LockButton buttonStyle={{marginTop: 24}}
                        onPress={() => this.props.navigate({routeName: Routes.BookStep1})}
            >
                <View style={{
                    width: 200,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={[Texts.Font_17_600, {
                        marginRight: 10,
                        marginLeft: 10,
                        color: Colors.white,
                        textAlign: "center"
                    }]}>立即預約</Text>
                </View>
            </LockButton>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(null, mapDispatchToProps)(ReservationButton);
