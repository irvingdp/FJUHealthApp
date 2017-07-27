import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton';
import LabelTextInput from '../componenets/LabelTextInput';
import Spinner from '../componenets/Spinner'
import ErrorMessage from "../componenets/ErrorMessage";

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

    static propTypes = {
        login: PropTypes.func.isRequired,
    };
    static navigationOptions = {
        title: 'Login',
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
                {this.props.isFetching ? <Spinner /> : null}
                <View style={{
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingBottom: 30,
                    paddingTop: 50,
                    backgroundColor: Colors.white
                }}>
                    <Image
                        source={require('../res/images/nav-logo.png')}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 40,
                    paddingTop: 40,
                    backgroundColor: Colors.lightGreen
                }}>
                    <LabelTextInput labelText={"Email Address"}
                                    textInputProps={{
                                        onChangeText: (text) => {
                                            this.setState({
                                                formData: {...this.state.formData ,email: text},
                                                validation: {...this.state.validation ,email: !!text}
                                            });
                                        },
                                        value: this.state.formData.email
                                    }}
                                    valid={this.state.validation.email}
                                    errorMsg={this.state.errorMsg.email}
                    />
                    <LabelTextInput style={{marginTop: 25}}
                                    labelText={"Password"}
                                    textInputProps={{
                                        onChangeText: (text) => {
                                            this.setState({
                                                formData: {...this.state.formData ,password: text},
                                                validation: {...this.state.validation ,password: !!text}
                                            });
                                        },
                                        value: this.state.formData.password
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
                            }]}>Login</Text>
                        </View>
                    </LockButton>
                    <Text style={[Texts.Font_14_400, {
                        marginTop: 15,
                        color: Colors.white,
                        textAlign: "center",
                        textDecorationLine: "underline"
                    }]}
                      onPress={() => this.props.navigate({routeName: Routes.ForgotPassword})}
                    >Forgot your password?</Text>
                </View>

                <View style={{height: 55, backgroundColor: Colors.deepGreen, justifyContent: "center"}}>
                    <Text style={[Texts.Font_14_400, {color: Colors.textWhite, textAlign: "center"}]}>
                        I don't have an account. <Text style={Texts.Font_14_900} onPress={() => this.props.navigate({routeName: Routes.Register})}>Register</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    isFetching: state.Auth.isFetching,
    error: state.Auth.error,
});

const mapDispatchToProps = dispatch => ({
    login: ({email, password}) => dispatch(ReduxAuth.ActionCreator.login({email, password})),
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
