import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';

import Routes from '../navigation/Routes'
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from "../componenets/LockButton"
import ReservationButton from "../componenets/ReservationButton"
import ReportCard from '../componenets/ReportCard'
import AppLabels from '../AppLabels'

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: AppLabels.ProfileScreen.title,
    }

    render() {
        let header = this.props.isLoggedIn && this.props.profile ? (
            <View style={{height: 160, backgroundColor: Colors.green, justifyContent: "center", alignItems: "center"}}>
                <Text style={[Texts.Font_16_600, {color: Colors.white}]}>{this.props.profile.name}</Text>
                <LockButton buttonStyle={{
                    marginTop: 12,
                    width: 113,
                    height: 32,
                    borderRadius: 20,
                    backgroundColor: Colors.transparent,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: Colors.textWhite,
                    borderWidth: 1,
                }}
                    onPress={() => this.props.navigate({routeName: Routes.ProfileDetail})}>

                    <Text style={[Texts.Font_14_600, {
                        color: Colors.white,
                        textAlign: "center"
                    }]}>{AppLabels.ProfileScreen.editProfile}</Text>

                </LockButton>
            </View>
        ) : null;

        let emptyContent =(
            <View style={{flex: 1, backgroundColor: Colors.grey, justifyContent: "center", alignItems: "center"}}>
                {header}
                <Image
                    source={require('../res/images/report.png')}
                    resizeMode={"contain"}
                />
                <Text style={[Texts.Font_17_600, {
                    color: Colors.textBlack,
                    textAlign: "center",
                    marginTop: 22,
                }]}>{AppLabels.ProfileScreen.noReport}</Text>
                <ReservationButton />
            </View>
        );
        let reportList =(
            <ScrollView style={{flex: 1,backgroundColor: Colors.grey}}>
                {header}
                <View style={{flex: 1, backgroundColor: Colors.grey,paddingLeft:16,paddingRight:16,paddingTop:20,paddingBottom:20}}>
                    <Text style={[Texts.Font_14_600, {
                        color: Colors.textBlack,
                    }]}>{AppLabels.ProfileScreen.report}</Text>
                    {(this.props.report||[]).map((report,index) =>
                        <ReportCard key={index} report={report} showNew={index === 0}/>
                    )}
                </View>
            </ScrollView>
        );
        return this.props.report ? reportList : emptyContent
    }
}
const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    profile: state.Profile ? state.Profile.data : null,
    report: state.Report.data,
});

const mapDispatchToProps = dispatch => ({
    navigate: (routeName) => dispatch(ReduxNav.ActionCreator.navigate(routeName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

