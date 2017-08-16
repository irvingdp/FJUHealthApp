import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Routes from '../navigation/Routes';
import AppLabels from '../AppLabels';
import {Layouts, Colors, Texts} from '../styles/BaseStyles'
import DeviceStore from '../DeviceStore'

import LockButton from '../componenets/LockButton';
import LogoutButton from '../componenets/LogoutButton';
import Spinner from '../componenets/Spinner'
import ReduxAuth from '../redux/Auth'
import ReduxDashboard from '../redux/Dashboard'
import {GENDER} from '../Enum'
import moment from 'moment';
import AppointmentCard from "../componenets/Dashboard/AppointmentCard"
import PaymentCard from "../componenets/Dashboard/PaymentCard"
import PackageCard from "../componenets/Dashboard/PackageCard"
import ReminderCard from "../componenets/Dashboard/ReminderCard"
import CompleteCard from "../componenets/Dashboard/CompleteCard"
import DashboardCard from "../componenets/Dashboard/DashboardCard"

//TODO: Ivan use aware kb scroll in registered form.
class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            token: "",
        }
    }

    static navigationOptions = {
        title: AppLabels.DashboardScreen.title,
        headerRight: <LogoutButton />

    };

    componentWillMount() {
        DeviceStore.loadUserData().then(data => {
            if (data && data.token) {
                return this.props.isValidToken(data.token);
            }
        }).then(() => {
            this.setState({initialized: true})
        }).catch(() => {
            this.setState({initialized: true})
        })
    }

    createAppointmentView() {
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
                        }]}>Book Now</Text>
                    </View>
                </LockButton>

            </View>
        )
    }

    createReservedView() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
                <View style={{backgroundColor: Colors.green, padding: 16}}>
                    <Text style={[Texts.Font_14_600, {textAlign: "center", color: Colors.white}]}>Your
                        Appointment</Text>
                    <Text style={[Texts.Font_20_400, {
                        textAlign: "center",
                        color: Colors.white,
                        marginTop: 12
                    }]}>{this.props.reserved.package.title + " (" + GENDER[this.props.reserved.package.gender.toUpperCase()] + ")"}</Text>
                    <Text style={[Texts.Font_14_400, {
                        textAlign: "center",
                        color: Colors.white,
                        marginTop: 3
                    }]}>{moment(this.props.reserved.reserveDate).format("DD MMM YYYY, A hh:mm")}</Text>
                </View>
                <AppointmentCard
                    reserved={this.props.reserved}
                    packages={this.props.packages}
                />
                <PaymentCard
                    reserved={this.props.reserved}
                />
                <PackageCard
                    reserved={this.props.reserved}
                />
                <ReminderCard
                    reminder={{
                        title: "REMINDER 1",
                        description: "Please read the Checkup Manual. We will also send you reminders via the app to guide you on pre-examination process.",
                        type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                    }}
                />
                <ReminderCard
                    reminder={{
                        title: "REMINDER 2",
                        description: "Please take your special meal 1.",
                        type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                    }}
                />
                <ReminderCard
                    reminder={{
                        title: "REMINDER 3",
                        description: "Please take your special meal 2.",
                        type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                    }}
                />
                <ReminderCard
                    reminder={{
                        title: "REMINDER 4",
                        description: "Please collect your body waste",
                        type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                    }}
                />
                <ReminderCard
                    reminder={{
                        title: "REMINDER 5",
                        description: "Please take your medicine at 3-5am to clean your colon. The hospital will give you a reminder call.",
                        type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                    }}
                    buttonText={"Set A Calendar Reminder"}
                    onButtonPress={() => 0}
                />
                <CompleteCard
                    reserved={this.props.reserved}
                    type={DashboardCard.TYPE.COMING} //TODO: how to know the type
                />
            </ScrollView>
        )
    }

    render() {
        if (!this.state.initialized) {
            return (<Spinner />)
        }
        if (this.props.reserved)
            return this.createReservedView();
        else
            return this.createAppointmentView();
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    reserved: state.Reserved.data,
    packages: state.Package.data
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    isValidToken: (token) => dispatch(ReduxAuth.ActionCreator.isValidToken(token)),
    loadDashboard: (token) => dispatch(ReduxDashboard.ActionCreator.loadDashboard()),

});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

