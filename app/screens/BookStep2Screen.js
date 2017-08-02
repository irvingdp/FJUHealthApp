import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'
import OptionButton from '../componenets/OptionButton'
import {GENDER} from '../Enum'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

LocaleConfig.locales['tw'] = {
    monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    dayNames: [,'星期日', '星期一','星期二','星期三','星期四','星期五','星期六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'tw';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class BookStep2Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPackage : "",
            selectedDay: {},
        };


    }
    static navigationOptions = {
        title: 'Book Appointment',
        tabBarVisible: false,
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    padding: 16,
                    height: 36,
                    backgroundColor: Colors.green,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}>
                    <Text style={{
                        ...Texts.Font_14_600,
                        color: Colors.white,
                    }}>2. Select Date</Text>
                    <Text style={{
                        ...Texts.Font_14_600,
                        color: Colors.white,
                        //TODO: formate the dateString to 12 July 2017 moment().format('MMMM Do YYYY, h:mm:ss a')
                    }}>{this.state.selectedDay.dateString || ""}</Text>

                </View>
                <Calendar
                    //TODO: set two week later.

                    // Initially visible month. Default = Date()
                    //current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    //minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    //maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined

                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false

                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    theme={{
                        calendarBackground: Colors.white,
                        textSectionTitleColor: Colors.textBlack,

                        selectedDayBackgroundColor: Colors.green,
                        selectedDayTextColor: Colors.textWhite,

                        todayTextColor: Colors.deepGreen,
                        dayTextColor: Colors.textBlack,
                        textDisabledColor: Colors.textGrey,

                        arrowColor: Colors.green,
                        monthTextColor: Colors.green,
                    }}

                    markedDates={{[this.state.selectedDay ? this.state.selectedDay.dateString : ""]: {selected: true}}}
                    onDayPress={(day) => {
                        console.log(day)
                        this.setState({
                            selectedDay: day,
                        });
                    }}
                />
                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }}  onPress={() => this.props.navigate({routeName: Routes.BookStep3})}
                >
                    <Text  style={{
                        ...Texts.Font_17_600,
                        color: Colors.white,
                    }}>Continue</Text>
                </LockButton>
            </View>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStep2Screen);
