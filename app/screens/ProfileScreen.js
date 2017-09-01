import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';

import Routes from '../navigation/Routes'
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from "../componenets/LockButton"
import ReservationButton from "../componenets/ReservationButton"
import ReportCard from '../componenets/ReportCard'


class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: 'Profile',
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
                            onPress={() => 0}
                >

                    <Text style={[Texts.Font_14_600, {
                        color: Colors.white,
                        textAlign: "center"
                    }]}>修改個人資料</Text>

                </LockButton>
            </View>
        ) : null;

        let emptyContent =(
            <View style={{flex: 1, backgroundColor: Colors.grey, justifyContent: "center", alignItems: "center"}}>
                <Image
                    source={require('../res/images/report.png')}
                    resizeMode={"contain"}
                />
                <Text style={[Texts.Font_17_600, {
                    color: Colors.textBlack,
                    textAlign: "center",
                    marginTop: 22,
                }]}>尚未有健檢報告</Text>
                <ReservationButton />
            </View>
        );
        let reportList =(
            <View style={{flex: 1, backgroundColor: Colors.grey,paddingLeft:16,paddingRight:16,paddingTop:20,paddingBottom:20}}>
                <Text style={[Texts.Font_14_600, {
                    color: Colors.textBlack,
                }]}>健檢報告</Text>
                {(this.props.report||[]).map((report,index) =>
                    <ReportCard key={index} report={report} showNew={index === 0}/>
                )}
            </View>
        );
        return (
            <ScrollView style={{flex: 1}}>
                {header}
                {this.props.report ? reportList : emptyContent}
            </ScrollView>
        )
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

