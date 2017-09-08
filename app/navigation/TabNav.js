import React, {Component} from 'react';
import {
    Image,
    Platform,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import ReduxDevice from '../redux/Device'

import {addNavigationHelpers, TabNavigator} from 'react-navigation';
import FCM, {
    FCMEvent,
    NotificationType,
    RemoteNotificationResult,
    WillPresentNotificationResult
} from 'react-native-fcm';

// Navigators
import {DashboardStackNavigator} from './DashboardNav'
import {PackageStackNavigator} from './PackageNav'
import {LocationStackNavigator} from './LocationNav'
import {ProfileStackNavigator} from './ProfileNav'

import {Colors} from '../styles/BaseStyles'
import Spinner from '../componenets/Spinner'
import AppLabels from '../AppLabels'

const routeConfiguration = {
    Dashboard: {
        screen: DashboardStackNavigator,
        navigationOptions: {
            tabBarLabel: AppLabels.TabBar.dashboard,
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require('../res/images/dashboard-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/dashboard-tabbar-icon.png')}/>
            },
        },
    },
    Package: {
        screen: PackageStackNavigator,
        navigationOptions: {
            tabBarLabel: AppLabels.TabBar.package,
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require('../res/images/package-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/package-tabbar-icon.png')}/>
            },
        },
    },
    Location: {
        screen: LocationStackNavigator,
        navigationOptions: {
            tabBarLabel: AppLabels.TabBar.location,
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require('../res/images/location-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/location-tabbar-icon.png')}/>
            },
        },
    },
    Profile: {
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarLabel: AppLabels.TabBar.profile,
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require('../res/images/profile-tabbar-active-icon.png')}/> :
                    <Image resizeMode="contain" source={require('../res/images/profile-tabbar-icon.png')}/>
            },
        },
    },
}
const tabBarConfiguration = {
    //...other configs
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: Colors.green,  // tint color is passed to text and icons (if enabled) on the tab bar
        inactiveTintColor: Colors.lightGrey,

        activeBackgroundColor: Colors.white,
        inactiveBackgroundColor: Colors.white,

        style: {
            backgroundColor: Colors.white,
            height: 50,
        },
        tabStyle: {
            paddingTop: 6,
            paddingBottom: 2
        },
        labelStyle: {}
    }
}

export const TabBarNavigator = TabNavigator(routeConfiguration, tabBarConfiguration);

class TabNav extends Component {
    render() {
        const {dispatch, navigationState} = this.props;
        return (
            <View style={{flex: 1}}>
                <Spinner isShow={this.props.isShowGlobalSpinner}/>
                <TabBarNavigator
                    navigation={
                        addNavigationHelpers({
                            dispatch: dispatch,
                            state: navigationState,
                        })
                    }
                />
            </View>
        )
    }

    componentDidMount() {
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(fcm_token => {
            this.props.dispatch(ReduxDevice.ActionCreator.createDevice(fcm_token))
            //fix navigation bug if connect TabNav with 'mapDispatchToProps'
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (fcm_token) => {
            this.props.dispatch(ReduxDevice.ActionCreator.createDevice(fcm_token))
            //fix navigation bug if connect TabNav with 'mapDispatchToProps'
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            console.log(notif);

            if (notif.local_notification) {
                //this is a local notification
            }
            if (notif.opened_from_tray) {
                //app is open/resumed because user clicked banner
            }
            //await someAsyncCall();

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
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
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }
}

const mapStateToProps = state => ({
    navigationState: state.Nav,

    isShowGlobalSpinner: state.GlobalView.isShowGlobalSpinner,
});

export default connect(mapStateToProps, null)(TabNav);

