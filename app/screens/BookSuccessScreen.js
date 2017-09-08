import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'
import ReduxNav from '../redux/Nav'
import {GENDER} from '../Enum'
import AppLabels from '../AppLabels'

class BookSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: AppLabels.BookScreen.bookSuccess,
        tabBarVisible: false,
        header: null
    };

    render() {
        let {selectedPackage, reservation} = this.props;
        return (
            <View style={{flex: 1,paddingTop: 50, backgroundColor: Colors.white}}>
                <TouchableOpacity style={{position: "absolute"}} onPress={() => {this.props.reset({routeName: Routes.Dashboard})}}>
                    <Image style={{top: 31, left: 15}}
                           source={require('../res/images/green-close-icon.png')}
                           resizeMode={"contain"}/>
                </TouchableOpacity>
                <View style={[{flex: 1, padding: 32, backgroundColor: Colors.white, alignItems: "center"}]}>
                    <Image source={require('../res/images/calendar-book-success.png')} resizeMode={"contain"}/>
                    <Text style={[Texts.Font_17_600, {color: Colors.textBlack, marginTop: 12}]}>{AppLabels.BookScreen.appointmentSubmitted}</Text>
                    <Text style={[Texts.Font_14_400, {color: Colors.textBlack, marginTop: 12}]}>{AppLabels.BookScreen.appointmentFor}</Text>
                    <View style={{
                        flex: 1,
                        padding: 16,
                        marginTop: 24,
                        alignSelf: 'stretch',
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.greyf3,
                        borderRadius: 8,
                    }}>
                        <Text style={[Texts.Font_20_400, {color: Colors.textBlack}]}>{selectedPackage.title + " (" + AppLabels.Common[selectedPackage.gender].toLocaleUpperCase() + ")"}</Text>
                        <Text style={[Texts.Font_14_400, {color: Colors.textBlack, marginTop: 8}]}>{reservation.reserveDate.format(AppLabels.Common.dateTimeFormat)}</Text>
                    </View>
                </View>
                <View style={[Layouts.centerLayout, {flex: 1, padding: 32, backgroundColor: Colors.deepGreen}]}>
                    <Text style={[Texts.Font_16_400, {textAlign: "center",color: Colors.white}]}>{AppLabels.BookScreen.proceedPayment}</Text>
                    <LockButton buttonStyle={{marginTop: 24}}
                                onPress={() => 0} //TODO: payment screen
                    >
                        <View style={{
                            width: 240,
                            height: 50,
                            borderRadius: 100,
                            backgroundColor: Colors.white,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={[Texts.Font_17_600, {
                                color: Colors.green,
                                textAlign: "center"
                            }]}>{AppLabels.Common.howToMakePayment}</Text>
                        </View>
                    </LockButton>
                    <Text style={[Texts.Font_14_400, {textAlign: "center",color: Colors.white, marginTop: 26, lineHeight: 20}]}>
                        {AppLabels.BookScreen.paymentFinishedDescription}
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    reservation: state.Reservation,
    selectedPackage: state.Package.data.find(p => p.id === state.Reservation.packageId)
});

const mapDispatchToProps = dispatch => ({
    reset: (route) => dispatch(ReduxNav.ActionCreator.reset(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSuccessScreen);




