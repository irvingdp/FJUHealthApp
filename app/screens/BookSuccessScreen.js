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

const gender = {
    female: "女",
    male: "男",
}
class BookSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: 'Book Success',
        tabBarVisible: false,
        header: null
    };

    render() {
        let {pkg, reservation} = this.props;
        let selectedPackage = pkg.data[reservation.packageId];

        return (
            <View style={{flex: 1,paddingTop: 50, backgroundColor: Colors.white}}>
                <TouchableOpacity style={{position: "absolute"}} onPress={() => {this.props.navigate({routeName: Routes.Dashboard})}}>
                    <Image style={{top: 31, left: 15}}
                           source={require('../res/images/green-close-icon.png')}
                           resizeMode={"contain"}/>
                </TouchableOpacity>
                <View style={[{flex: 1, padding: 32, backgroundColor: Colors.white, alignItems: "center"}]}>
                    <Image source={require('../res/images/calendar-book-success.png')} resizeMode={"contain"}/>
                    <Text style={[Texts.Font_17_600, {color: Colors.textBlack, marginTop: 12}]}>Appointment
                        Submitted!</Text>
                    <Text style={[Texts.Font_14_400, {color: Colors.textBlack, marginTop: 12}]}>You have booked an
                        appointment for:</Text>
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
                        <Text style={[Texts.Font_20_400, {color: Colors.textBlack}]}>{selectedPackage.title + " (" + gender[selectedPackage.gender] + ")"}</Text>
                        <Text style={[Texts.Font_14_400, {color: Colors.textBlack, marginTop: 8}]}>{reservation.reserveDate.format("DD MMM YYYY, A hh:mm")}</Text>
                    </View>
                </View>
                <View style={[Layouts.centerLayout, {flex: 1, padding: 32, backgroundColor: Colors.deepGreen}]}>
                    <Text style={[Texts.Font_16_400, {textAlign: "center",color: Colors.white}]}>
                        Please proceed with making payment to complete your reservation.
                    </Text>
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
                            }]}>How To Make Payment</Text>
                        </View>
                    </LockButton>
                    <Text style={[Texts.Font_14_400, {textAlign: "center",color: Colors.white, marginTop: 26}]}>
                        Once payment is received, we will send you a package with Checkup Manual, Speciment Collector and Complimentary Diet.
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    reservation: state.Reservation,
    pkg: state.Package,
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSuccessScreen);




