import ReduxNav from '../redux/Nav'
import ReduxReservation from '../redux/Reservation'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'
import LabelInput from '../componenets/LabelInput';
import moment from 'moment'
import AppLabels from '../AppLabels'

class BookStep3Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //load data from profile..

            validation: {
                name: true,
                birthday: true,
                phoneNumber: true,
                contactAddress: true,
            },
            errorMsg: {
                name: "",
                birthday: "",
                phoneNumber: "",
                contactAddress: "",
            }
        }
        //pre-fill form data
        if(this.props.formData) {
            this.state.formData = {...this.props.formData}
        } else if(this.props.profile){
            this.state.formData = {
                name:  this.props.profile.name,
                birthday:  moment(this.props.profile.birthday).format("YYYY-MM-DD"),
                phoneNumber:  this.props.profile.phoneNumber,
                contactAddress:  this.props.profile.contactAddress,
            }
        } else {
            this.state.formData = {}
        }
    }

    static navigationOptions = {
        title: AppLabels.Common.reservation,
        tabBarVisible: false,
    };

    componentWillUnmount() {
        //save the user data to store. restore on constructor.
        this.props.setFormData({
            name: this.state.formData.name,
            birthday: this.state.formData.birthday,
            phoneNumber: this.state.formData.phoneNumber,
            contactAddress: this.state.formData.contactAddress,
        })
    }

    _doClientValidation() {
        let valid = !!this.state.formData.name &&
            !!this.state.formData.birthday &&
            !!this.state.formData.phoneNumber &&
            !!this.state.formData.contactAddress;

        if(!valid) {
            this.setState({
                validation:{
                    name: !!this.state.formData.name,
                    birthday: !!this.state.formData.birthday,
                    phoneNumber: !!this.state.formData.phoneNumber,
                    contactAddress: !!this.state.formData.contactAddress,
                }
            });
        }
        return valid;
    }

    _submit() {
        this.props.reserve({
            name: this.state.formData.name,
            birthday: this.state.formData.birthday,
            phoneNumber: this.state.formData.phoneNumber,
            contactAddress: this.state.formData.contactAddress,
        }).then(() => {
            if(this.props.reservationError) {
                Alert.alert(AppLabels.Common.error.toLocaleUpperCase(),this.props.reservationError.message);
            } else {
                this.props.navigate({routeName: Routes.BookSuccessScreen});
            }
        })
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    height: 36,
                    padding: 16,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                }}>
                    <Text style={{
                        ...Texts.Font_14_600,
                        color: Colors.white,
                    }}>{AppLabels.BookScreen.personalDetails}</Text>
                </View>
                <ScrollView
                    //TODO: Ivan: use Aware kb scroll view
                    style={{
                        flex: 1,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 20,
                        paddingBottom: 40,
                        backgroundColor: Colors.white
                    }}>
                    <LabelInput labelText={AppLabels.Common.name}
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
                                    styleType={LabelInput.STYLE_TYPE.BLACK}
                    />
                    <LabelInput labelText={AppLabels.Common.birthday}
                                    valid={this.state.validation.birthday}
                                    errorMsg={this.state.errorMsg.birthday}
                                    styleType={LabelInput.STYLE_TYPE.BLACK}
                                    inputType={LabelInput.INPUT_TYPE.PICKER}
                                    date={this.state.formData.birthday}
                                    onPickerDone={(date) => {
                                        this.setState({
                                            formData: {...this.state.formData, birthday: date},
                                            validation: {...this.state.validation, birthday: !!date}
                                        });
                                    }}
                                    style={{marginTop: 24}}
                    />
                    <LabelInput labelText={AppLabels.Common.mobileNumber}
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
                                    styleType={LabelInput.STYLE_TYPE.BLACK}
                                    style={{marginTop: 24}}
                    />
                    <LabelInput labelText={AppLabels.Common.address}
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
                                    styleType={LabelInput.STYLE_TYPE.BLACK}
                                    style={{marginTop: 24}}
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
                    }}>{AppLabels.Common.submit}</Text>
                </LockButton>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    reservationError:  state.Reservation.reservationError,
    profile: state.Profile.data,
    formData: state.Reservation.formData,
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    setFormData: (formData) => dispatch(ReduxReservation.ActionCreator.setFormData(formData)),
    reserve: (formData) => dispatch(ReduxReservation.ActionCreator.reserve(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStep3Screen);
