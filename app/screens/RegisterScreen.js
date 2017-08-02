import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton';
import LabelInput from '../componenets/LabelInput';
import Spinner from '../componenets/Spinner'
import ErrorMessage from '../componenets/ErrorMessage';
import Header from '../componenets/Header'

class RegisterScreen extends Component {
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
        title: 'Register',
        tabBarVisible: false,
        header: null
    };
    _doClientValidation() {
        let valid = !!this.state.formData.email && !!this.state.formData.password;

        if(valid) {
            this.props.register(this.state.formData);
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
                <Header/>
                <View style={{
                    flex: 1,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 40,
                    paddingTop: 40,
                    backgroundColor: Colors.lightGreen
                }}>
                    <Text style={[Texts.Font_17_600, {
                        color: Colors.white,
                    }]}>Create A New Account</Text>
                    <Text style={[Texts.Font_14_400, {
                        color: Colors.white,
                        marginTop: 12
                    }]}>Schedule an appointment, get reminders, see your check up report and more.</Text>
                    <LabelInput style={{marginTop: 25}}
                                    labelText={"Email Address"}
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
                                    labelText={"Password"}
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
                            }]}>Register</Text>
                        </View>
                    </LockButton>

                    <Text style={[Texts.Font_13_400, {
                        marginTop: 15,
                        color: Colors.textWhite,
                    }]}>
                        By registering, you agree to our <Text style={{textDecorationLine: "underline"}} onPress={() => this.props.navigate({routeName: Routes.ForgotPassword})}>Terms & conditions</Text>
                    </Text>

                </View>

                <View style={{height: 55, backgroundColor: Colors.deepGreen, justifyContent: "center"}}>
                    <Text style={[Texts.Font_14_400, {color: Colors.textWhite, textAlign: "center"}]}>
                        Already have an account? <Text style={Texts.Font_14_900} onPress={() => this.props.replace({routeName: Routes.Login})}>Login</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    isFetching: state.Auth.isFetching,
    error: state.Auth.registerError,
});

const mapDispatchToProps = dispatch => ({
    register: ({email, password}) => dispatch(ReduxAuth.ActionCreator.register({email, password})),
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    replace: (route) => dispatch(ReduxNav.ActionCreator.replace(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
