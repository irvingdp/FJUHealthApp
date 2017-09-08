import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import ReduxNav from '../redux/Nav';
import ReduxProfile from '../redux/Profile'
import {connect} from 'react-redux';

import Routes from '../navigation/Routes'
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from "../componenets/LockButton"
import LabelInput from '../componenets/LabelInput';
import moment from 'moment'
import {GENDER} from '../Enum'
import AppLabels from '../AppLabels'

class ProfileDetailScreen extends Component {
    constructor(props) {
        super(props);
        let {profile, user} = this.props;
        this.state = {
            formData: {
                name: profile.name,
                uid: user.uid,
                birthday: profile.birthday,
                gender: profile.gender,
                email: user.email,
                phoneNumber: profile.phoneNumber,
                contactAddress: profile.contactAddress,
            },
            validation: {
                name: true,
                gender: true,
                phoneNumber: true,
                contactAddress: true,
            },
            errorMsg: {
                name: "",
                gender: "",
                phoneNumber: "",
                contactAddress: "",
            }
        }
    }

    static navigationOptions = {
        title: '修改個人資料',
    }
    static navigationOptions = {
        title: '修改個人資料',
        tabBarVisible: false,
    };

    _doClientValidation() {
        let valid = !!this.state.formData.name &&
            !!this.state.formData.phoneNumber &&
            !!this.state.formData.contactAddress;

        if(!valid) {
            this.setState({
                validation:{
                    name: !!this.state.formData.name,
                    phoneNumber: !!this.state.formData.phoneNumber,
                    contactAddress: !!this.state.formData.contactAddress,
                }
            });
        }
        return valid;
    }

    _submit() {
        this.props.updateProfile({
            name: this.state.formData.name,
            phoneNumber: this.state.formData.phoneNumber,
            contactAddress: this.state.formData.contactAddress,
        }).then(() => {
            if(this.props.updateProfileError) {
                Alert.alert("ERROR",this.props.updateProfileError.message);
            } else {
                this.props.back({routeName: Routes.Profile});
            }
        }).catch((err) => {
            Alert.alert("ERROR",err);
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 40,
                    paddingTop: 20,
                    backgroundColor: Colors.white
                }}>
                    <LabelInput labelText={"姓名"}
                                textInputProps={{
                                    onChangeText: (text) => {
                                        this.setState({
                                            formData: {...this.state.formData, name: text},
                                            validation: {...this.state.validation, name: !!text}
                                        });
                                    },
                                    value: this.state.formData.name,
                                    autoCapitalize: "none",
                                }}
                                valid={this.state.validation.name}
                                errorMsg={this.state.errorMsg.name}
                                styleType={LabelInput.STYLE_TYPE.GREY}
                    />
                    <LabelInput labelText={"身分證字號 / 護照號碼"}
                                textInputProps={{
                                    value: this.state.formData.uid,
                                }}
                                inputType={LabelInput.INPUT_TYPE.TEXT}
                                styleType={LabelInput.STYLE_TYPE.DISABLED}
                                style={{marginTop: 24}}
                    />
                    <LabelInput labelText={"出生年月日"}
                                textInputProps={{
                                    value: moment(this.state.formData.birthday).format('DD MMM YYYY'),
                                }}
                                inputType={LabelInput.INPUT_TYPE.TEXT}
                                styleType={LabelInput.STYLE_TYPE.DISABLED}
                                style={{marginTop: 24}}
                    />
                    <LabelInput
                        labelText={"性別"}
                        radioData={[
                            {label: '男', value: GENDER.MALE, isChecked: this.state.formData.gender === GENDER.MALE},
                            {label: '女', value: GENDER.FEMALE, isChecked: this.state.formData.gender === GENDER.FEMALE},
                        ]}
                        inputType={LabelInput.INPUT_TYPE.RADIO}
                        styleType={LabelInput.STYLE_TYPE.DISABLED}
                        style={{marginTop: 24}}
                    />
                    <LabelInput labelText={"電子郵件"}
                                textInputProps={{
                                    value: this.state.formData.email,
                                }}
                                inputType={LabelInput.INPUT_TYPE.TEXT}
                                styleType={LabelInput.STYLE_TYPE.DISABLED}
                                style={{marginTop: 24}}
                    />
                    <LabelInput labelText={"手機號碼"}
                                textInputProps={{
                                    onChangeText: (text) => {
                                        this.setState({
                                            formData: {...this.state.formData, phoneNumber: text},
                                            validation: {...this.state.validation, phoneNumber: !!text}
                                        });
                                    },
                                    value: this.state.formData.phoneNumber,
                                    autoCapitalize: "none",
                                }}
                                valid={this.state.validation.phoneNumber}
                                errorMsg={this.state.errorMsg.phoneNumber}
                                styleType={LabelInput.STYLE_TYPE.GREY}
                                style={{marginTop: 24}}
                    />
                    <LabelInput labelText={"聯絡地址"}
                                textInputProps={{
                                    onChangeText: (text) => {
                                        this.setState({
                                            formData: {...this.state.formData, contactAddress: text},
                                            validation: {...this.state.validation, contactAddress: !!text}
                                        });
                                    },
                                    value: this.state.formData.contactAddress,
                                    autoCapitalize: "none",
                                }}
                                valid={this.state.validation.contactAddress}
                                errorMsg={this.state.errorMsg.contactAddress}
                                styleType={LabelInput.STYLE_TYPE.GREY}
                                style={{marginTop: 24, marginBottom: 24}}
                    />
                </ScrollView>
                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    this._doClientValidation() && this._submit()
                }}
                >
                    <Text style={{
                        ...Texts.Font_17_600,
                        color: Colors.white,
                    }}>{AppLabels.Common.save}</Text>
                </LockButton>
            </View>

        )
    }
}
const mapStateToProps = state => ({
    isLoggedIn: state.Auth.isLoggedIn,
    profile: state.Profile ? state.Profile.data : {},
    user: state.User ? state.User.data : {},
    updateProfileError:  state.Profile.updateProfileError,
});

const mapDispatchToProps = dispatch => ({
    back: () => dispatch(ReduxNav.ActionCreator.back()),
    navigate: (routeName) => dispatch(ReduxNav.ActionCreator.navigate(routeName)),
    updateProfile: (formData) => dispatch(ReduxProfile.ActionCreator.updateProfile(formData))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailScreen);

