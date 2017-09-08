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

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: "",
                password: "",
            },
            validation: {
                email: true,
                password: true,
            },
            errorMsg: {
                email: "",
                password: "",
            }
        }
    }
    static navigationOptions = {
        title: AppLabels.LoginScreen.title,
        tabBarVisible: false,
        header: null
    };
    _doClientValidation() {
        let valid = !!this.state.formData.email && !!this.state.formData.password;

        if(valid) {
            this.props.login(this.state.formData)
        } else {
            this.setState({
                validation:{
                    email: !!this.state.formData.email,
                    password: !!this.state.formData.password,
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
                    <LabelInput labelText={AppLabels.LoginScreen.email}
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
                    />
                    <LabelInput style={{marginTop: 25}}
                                    labelText={AppLabels.LoginScreen.password}
                                    textInputProps={{
                                        onChangeText: (text) => {
                                            this.setState({
                                                formData: {...this.state.formData ,password: text},
                                                validation: {...this.state.validation ,password: !!text}
                                            });
                                        },
                                        value: this.state.formData.password,
                                        secureTextEntry: true,
                                        autoCapitalize: "none",
                                    }}
                                    valid={this.state.validation.password}
                                    errorMsg={this.state.errorMsg.password}
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
                            }]}>{AppLabels.LoginScreen.login}</Text>
                        </View>
                    </LockButton>
                    <Text style={[Texts.Font_14_400, {
                        marginTop: 15,
                        color: Colors.white,
                        textAlign: "center",
                        textDecorationLine: "underline"
                    }]}
                      onPress={() => this.props.navigate({routeName: Routes.ForgotPassword})}
                    >{AppLabels.LoginScreen.forgetPassword}</Text>
                </View>

                <View style={{height: 55, backgroundColor: Colors.deepGreen, justifyContent: "center"}}>
                    <Text style={[Texts.Font_14_400, {color: Colors.textWhite, textAlign: "center"}]}>
                        {AppLabels.LoginScreen.noAccount} <Text style={Texts.Font_14_900} onPress={() => this.props.replace({routeName: Routes.Register})}>{AppLabels.LoginScreen.register}</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    error: state.Auth.loginError,
});

const mapDispatchToProps = dispatch => ({
    login: ({email, password}) => dispatch(ReduxAuth.ActionCreator.login({email, password})),
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    replace: (route) => dispatch(ReduxNav.ActionCreator.replace(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
