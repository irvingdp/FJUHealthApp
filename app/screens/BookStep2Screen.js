import ReduxNav from '../redux/Nav'
import ReduxReservation from '../redux/Reservation'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'

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

class BookStep2Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay : null,
            validation: {
                reserveDate: null,
            }
        };
    }
    static navigationOptions = {
        title: 'Book Appointment',
        tabBarVisible: false,
    };
    _doClientValidation() {
        if(this.state.selectedDay) {
            this.props.setDate({reserveDate: moment(this.state.selectedDay.timestamp)});
            this.props.navigate({routeName: Routes.BookStep3});
        } else {
            this.setState({
                validation:{
                    reserveDate: false,
                }
            });
        }
    }

    render() {
        //TODO: load block days from api...
        let disabledDay = {'2017-08-28': {disabled: true}};
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
                    }}>{viewDataTransformer.formatSelectedDay(this.state.selectedDay)}</Text>

                </View>
                <Calendar
                    minDate={moment().add(14, 'day').format()}
                    firstDay={1}

                    theme={{
                        calendarBackground: Colors.white,
                        textSectionTitleColor: Colors.textBlack,
                        selectedDayBackgroundColor: Colors.green,
                        selectedDayTextColor: Colors.textWhite,
                        dayTextColor: Colors.textBlack,
                        textDisabledColor: Colors.textCalDisabled,
                        arrowColor: Colors.green,
                        monthTextColor: Colors.green,
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                    }}

                    markedDates={{
                        [this.state.selectedDay ? this.state.selectedDay.dateString : ""]: {selected: true},
                        ...disabledDay,
                    }}
                    onDayPress={(day) => {
                        if(!disabledDay[day.dateString]) {
                            this.setState({
                                selectedDay: day,
                            });
                        }
                    }}
                    hideExtraDays = {true}
                />
                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }}  onPress={() => this._doClientValidation()}
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

const viewDataTransformer = {
    /*
    selectedDay: (date) => {
        if(date) {
            return {
                timestamp:  moment(date).unix(),
                dateString:  moment(date).format('YYYY-MM-DD'),
            };
        } else {
            return null;
        }

    },
    */
    formatSelectedDay: (date) => {
        return date ? moment(date.timestamp).format('YYYY-MM-DD') : "";
    }
}
const mapStateToProps = state => ({
    //selectedDay: viewDataTransformer.selectedDay(state.Reservation.reserveDate),
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    setDate: ({reserveDate}) => dispatch(ReduxReservation.ActionCreator.setDate({reserveDate})),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStep2Screen);
