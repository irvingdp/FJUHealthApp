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

class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: "",
            },
            validation: {
                email: true,
            },
            errorMsg: {
                email: "",
            }
        }
    }
    static navigationOptions = {
        tabBarVisible: false,
        header: null
    };
    _doClientValidation() {
        let valid = !!this.state.formData.email;

        if(valid) {
            this.props.forgetPassword(this.state.formData)
        } else {
            this.setState({
                validation:{
                    email: !!this.state.formData.email,
                }
            });
        }
    }
    render() {
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
                    }]}>{AppLabels.ForgetPasswordScreen.forgetPassword}</Text>
                    <Text style={[Texts.Font_14_400, {
                        marginTop: 11,
                        color: Colors.white,
                        lineHeight: 18,
                    }]}>{AppLabels.ForgetPasswordScreen.description}</Text>

                    <LabelInput labelText={AppLabels.ForgetPasswordScreen.email}
                                    textInputProps={{
                                        onChangeText: (text) => {
                                            this.setState({
                                                formData: {...this.state.formData ,email: text},
                                                validation: {...this.state.validation ,email: !!text}
                                            });
                                        },
                                        value: this.state.formData.email,
                                        autoCapitalize: "none",
                                    }}
                                    valid={this.state.validation.email}
                                    errorMsg={this.state.errorMsg.email}
                                    style={{marginTop: 25}}
                    />
                    <ErrorMessage error={this.props.error}/>

                    <LockButton buttonStyle={{marginTop: 40}}
                                onPress={() => this._doClientValidation()}
                    >
                        <View style={{
                            width: 315,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: Colors.white,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={[Texts.Font_17_600, {
                                color: Colors.green,
                                textAlign: "center"
                            }]}>{AppLabels.ForgetPasswordScreen.continue}</Text>
                        </View>
                    </LockButton>

                </View>

                <View style={{height: 55, backgroundColor: Colors.deepGreen, justifyContent: "center"}}>
                    <Text style={[Texts.Font_14_400, {color: Colors.textWhite, textAlign: "center"}]}>
                        {AppLabels.ForgetPasswordScreen.justRemembered} <Text style={Texts.Font_14_900} onPress={() => this.props.back()}>{AppLabels.ForgetPasswordScreen.reLogin}</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    error: state.Auth.forgetPasswordError,
});

const mapDispatchToProps = dispatch => ({
    forgetPassword: ({email}) => dispatch(ReduxAuth.ActionCreator.forgetPassword({email})),
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    replace: (route) => dispatch(ReduxNav.ActionCreator.replace(route)),
    back: () => dispatch(ReduxNav.ActionCreator.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen);
