import React, {Component} from 'react'
import {
    TextInput,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import DatePicker from 'react-native-datepicker'

export default class LabelInput extends Component {
    constructor(props) {
        super(props);
    }

    static STYLE_TYPE = {
        BLACK: 0,
        WHITE: 1,
    }
    static INPUT_TYPE = {
        INPUT: 0,
        PICKER: 1,
    }
    static propTypes = {
        labelText: React.PropTypes.string,
        labelProps: React.PropTypes.object,
        textInputProps: React.PropTypes.object,
        errorMsg: React.PropTypes.string,
        styleType: React.PropTypes.number,
        inputType: React.PropTypes.number,
        onPickerDone: React.PropTypes.func,
    }
    static defaultProps = {
        labelProps: {},
        textInputProps: {},
        valid: true,
        errorMsg: "",
        styleType: LabelInput.STYLE_TYPE.WHITE,
        inputType: LabelInput.INPUT_TYPE.INPUT,
        onPickerDone: () => {
        }
    }
//TODO: IVAN 1.right X icon   2.show password icon

    _onTextInputPress() {
        if (this.props.inputType === LabelInput.INPUT_TYPE.PICKER) {
            this.refs.datePicker && this.refs.datePicker.onPressDate()
        }
    }

    render() {
        let {labelProps, textInputProps, labelText, valid, errorMsg, style, styleType, inputType, date, onPickerDone} = this.props;
        let baseColor = LabelInput.STYLE_TYPE.WHITE === styleType ? Colors.white : Colors.textGrey;


        return (
            <View style={style}>
                <Text style={[Texts.Font_14_400, {color: valid ? baseColor : Colors.red}]}
                      {...labelProps}>
                    {labelText}
                </Text>

                {inputType === LabelInput.INPUT_TYPE.PICKER ?
                    <TouchableOpacity onPress={this._onTextInputPress.bind(this)} style={[
                        {
                            borderBottomWidth: 0.5,
                            borderBottomColor: valid ? baseColor : Colors.red,
                            marginTop: 12,
                            paddingBottom: 5,
                        }
                    ]}>
                        <Text style={[Texts.Font_16_400, {color: baseColor}]}>{date}</Text>
                    </TouchableOpacity>
                    :
                    <TextInput
                        style={
                            [
                                Texts.Font_16_400,
                                {
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: valid ? baseColor : Colors.red,
                                    marginTop: 12,
                                    paddingBottom: 5,
                                    color: baseColor,
                                }
                            ]}
                        {...textInputProps}
                    />
                }

                {(!valid && errorMsg) ?
                    <Text style={[Texts.Font_14_400, {color: Colors.red}]}>
                        {errorMsg}
                    </Text>
                : null}

                {inputType === LabelInput.INPUT_TYPE.PICKER ?
                    <DatePicker
                        style={{width: 0, height: 0, backgroundColor:"red"}}
                        ref={"datePicker"}
                        hideText={true}
                        date={date}
                        mode="date"
                        androidMode="spinner"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={onPickerDone}
                    />
                    : null
                }

            </View>
        )
    }
}
