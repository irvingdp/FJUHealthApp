import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton';
import LabelInput from '../componenets/LabelInput';
import ErrorMessage from "../componenets/ErrorMessage";
import Header from "../componenets/Header";
import AppLabels from "../AppLabels";

class ForgetPasswordSuccessScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        tabBarVisible: false,
        header: null
    };
    render() {
        let email = "irvingdp@gmail.com"
        return (
            <View style={{flex: 1, justifyContent: "space-between"}}>
                <Header/>
                <View style={{
                    flex: 1,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 40,
                    paddingTop: 40,
                    backgroundColor: Colors.lightGreen
                }}>
                    <Text style={[Texts.Font_17_900, {
                        marginTop: 15,
                        color: Colors.white,
                    }]}>{AppLabels.ForgetPasswordSuccessScreen.mailSent}</Text>
                    <Text style={[Texts.Font_14_400, {
                        marginTop: 11,
                        color: Colors.white,
                        lineHeight: 18,
                    }]}>{AppLabels.ForgetPasswordSuccessScreen.alreadySent}</Text>
                    <Text style={[Texts.Font_14_400, {
                        color: Colors.white,
                        lineHeight: 18,
                    }]}>{this.props.resetEmail}</Text>
                    <Text style={[Texts.Font_14_400, {
                        marginTop: 20,
                        color: Colors.white,
                        lineHeight: 18,
                    }]}>{AppLabels.ForgetPasswordSuccessScreen.description}</Text>
                </View>

                <View style={{height: 55, backgroundColor: Colors.deepGreen, justifyContent: "center"}}>
                    <Text style={[Texts.Font_14_400, {color: Colors.textWhite, textAlign: "center"}]}>
                        {AppLabels.ForgetPasswordSuccessScreen.alreadyRest} <Text style={Texts.Font_14_900} onPress={() => this.props.back()}>{AppLabels.ForgetPasswordSuccessScreen.reLogin}</Text>
                    </Text>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    resetEmail: state.Auth.resetEmail,
});
const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    replace: (route) => dispatch(ReduxNav.ActionCreator.replace(route)),
    back: () => dispatch(ReduxNav.ActionCreator.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordSuccessScreen);
