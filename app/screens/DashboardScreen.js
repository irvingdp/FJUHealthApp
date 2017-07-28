import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import Routes from '../navigation/Routes';
import AppLabels from '../AppLabels';
import {Layouts, Colors, Texts} from '../styles/BaseStyles'
import DeviceStore from '../DeviceStore'

import LockButton from '../componenets/LockButton';
import Spinner from '../componenets/Spinner'
import ReduxAuth from '../redux/Auth'

//TODO: Ivan use aware kb scroll in registered form.
class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
        }
    }
    static navigationOptions = {
        title: AppLabels.DashboardScreen.title,

    };
    componentWillMount() {
        DeviceStore.loadUserData().then(data => {
            if(data && data.token) {
                return this.props.isValidToken(data.token);
            }
        }).then(() => {
            this.setState({initialized: true})
        })
    }
    render() {
        if(!this.state.initialized) {
            return(<Spinner />)
        }
        DeviceStore.loadUserData().then(data => {
            this.setState({token: data.token})
        });
        return (
            <View style={[Layouts.centerLayout]}>
                <Image
                    source={require('../res/images/dashboard-calendar.png')}
                    resizeMode={"contain"}
                />
                <Text style={[Texts.Font_17_600, {color: Colors.textBlack, marginTop: 12}]}>No Appointment Yet!</Text>
                <Text style={[Texts.Font_14_400, {color: Colors.textGrey, marginTop: 12}]}>Schedule a medical checkup
                    with us.</Text>
                <LockButton buttonStyle={{marginTop: 24}}
                            onPress={() => this.props.navigate({routeName: Routes.Book})}
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
                        }]}>Book Now</Text>
                    </View>
                </LockButton>
                <Text style={{marginTop: 50}}>just for test</Text>
                <Text>{this.state.token}</Text>
            </View>
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    isValidToken: (token) => dispatch(ReduxAuth.ActionCreator.isValidToken({token})),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

