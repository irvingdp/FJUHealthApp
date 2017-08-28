import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Platform,
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
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

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
    componentDidMount() {
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            Alert.alert(token);
            console.log(token)
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            console.log(notif);

            if(notif.local_notification){
                //this is a local notification
            }
            if(notif.opened_from_tray){
                //app is open/resumed because user clicked banner
            }
            //await someAsyncCall();

            if(Platform.OS ==='ios'){
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch(notif._notificationType){
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        });

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
    }
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
    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
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
                {(this.props.reserved.reminder || []).map(reminder => {
                    return (
                        <ReminderCard
                            key={reminder.id}
                            reminder={{
                                title: reminder.title,
                                description: reminder.description,
                                type: DashboardCard.TYPE.COMING, //TODO: how to know the type
                                date: reminder.notifyDate,
                            }}
                            buttonText= {reminder.title === "REMINDER 5" ? "Set A Calendar Reminder": null}
                            onButtonPress={reminder.title === "REMINDER 5" ? (()=>{0}) : null} //TODO: how to know reminder 5
                        />
                    )
                })}
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

