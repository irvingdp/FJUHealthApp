import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Texts} from '../styles/BaseStyles'
import DeviceStore from '../DeviceStore'

import LogoutButton from '../componenets/LogoutButton';

import ReduxAuth from '../redux/Auth'

import moment from 'moment';
import AppointmentCard from "../componenets/Dashboard/AppointmentCard"
import PaymentCard from "../componenets/Dashboard/PaymentCard"
import PackageCard from "../componenets/Dashboard/PackageCard"
import ReminderCard from "../componenets/Dashboard/ReminderCard"
import CompleteCard from "../componenets/Dashboard/CompleteCard"
import DashboardCard from "../componenets/Dashboard/DashboardCard"
import ReservationButton from '../componenets/ReservationButton'
import ReportCard from '../componenets/ReportCard'
import AppLabels from '../AppLabels'

//TODO: Ivan use aware kb scroll in registered form.
class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        }
    }
    static navigationOptions = {
        title: AppLabels.DashboardScreen.title,
        headerRight: <LogoutButton />

    };
    componentDidMount() {
        /*
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "ACTION",                             // as FCM payload
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
            tag: 'some_tag',                                    // Android only
            group: "group",                                     // Android only
            //picture: "https://google.png",                      // Android only bigPicture style
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground : true                                 // notification when app is in foreground (local & remote)
        });
        */
    }

    componentWillMount() {
        DeviceStore.loadUserData().then(data => {
            if (data && data.token) {
                return this.props.isValidToken(data.token);
            }
        })
    }

    createAppointmentView() {
        return (
            <View style={{flex: 1}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.grey}}>
                    <Image
                        source={require('../res/images/dashboard-calendar.png')}
                        resizeMode={"contain"}
                    />
                    <Text style={[Texts.Font_17_600, {color: Colors.textBlack, marginTop: 12}]}>{AppLabels.DashboardScreen.notYetAppointment}</Text>
                    <ReservationButton/>
                </View>
                {this.props.latestReport ?
                    <View style={{height: 153, backgroundColor: Colors.green, padding: 16}}>
                        <Text style={[Texts.Font_14_400, {color: Colors.textWhite}]}>{AppLabels.DashboardScreen.myReports}</Text>
                        <ReportCard report={this.props.latestReport} showNew={true}/>
                    </View>
                    : null
                }
            </View>
        )
    }

    createReservedView() {
        let totalSentReminderCount = 0;
        return (
            <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
                <View style={{backgroundColor: Colors.green, padding: 16}}>
                    <Text style={[Texts.Font_14_600, {textAlign: "center", color: Colors.white}]}>{AppLabels.DashboardScreen.yourAppointment}</Text>
                    <Text style={[Texts.Font_20_400, {
                        textAlign: "center",
                        color: Colors.white,
                        marginTop: 12
                    }]}>{this.props.reserved.package.title + " (" + AppLabels.Common[this.props.reserved.package.gender].toLocaleUpperCase() + ")"}</Text>
                    <Text style={[Texts.Font_14_400, {
                        textAlign: "center",
                        color: Colors.white,
                        marginTop: 3
                    }]}>{moment(this.props.reserved.reserveDate).format(AppLabels.Common.dateTimeFormat)}</Text>
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
                {(this.props.reserved.reminder || []).map(reminder => {
                    reminder.isSent && (totalSentReminderCount++);
                    let needShowButton = false;//reminder.key  === REMINDER_KEYS.CATHARTIC && !reminder.isSent;
                    return (
                        <ReminderCard
                            key={reminder.id}
                            reminder={{
                                title: reminder.title,
                                description: reminder.description,
                                type: reminder.isSent ? DashboardCard.TYPE.FINISH : DashboardCard.TYPE.COMING,
                                date: reminder.notifyDate,
                            }}
                            buttonText= {needShowButton ? "Set A Calendar Reminder": null}
                            onButtonPress={needShowButton ? (()=>{0}) : null}
                        />
                    )
                })}
                <CompleteCard
                    reserved={this.props.reserved}
                    type={totalSentReminderCount === this.props.reserved.reminder.length ? DashboardCard.TYPE.FINISH : DashboardCard.TYPE.COMING}
                />
            </ScrollView>
        )
    }

    render() {
        if (this.props.reserved)
            return this.createReservedView();
        else
            return this.createAppointmentView();
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    reserved: state.Reserved.data,
    packages: state.Package.data,
    latestReport: state.Report.data ? state.Report.data[0] : null, //report should order by date desc
});

const mapDispatchToProps = dispatch => ({
    isValidToken: (token) => dispatch(ReduxAuth.ActionCreator.isValidToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

