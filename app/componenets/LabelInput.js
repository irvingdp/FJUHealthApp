import React, {Component} from 'react'
import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import DatePicker from 'react-native-datepicker'
import Dash from 'react-native-dash'

export default class LabelInput extends Component {
    constructor(props) {
        super(props);
    }

    static STYLE_TYPE = {
        BLACK: 0,
        WHITE: 1,
        GREY: 2,
        DISABLED: 3,
    }
    static INPUT_TYPE = {
        INPUT: 0,
        PICKER: 1,
        TEXT: 2,
        RADIO: 3,
    }
    static propTypes = {
        labelText: React.PropTypes.string,
        labelProps: React.PropTypes.object,
        textInputProps: React.PropTypes.object,
        errorMsg: React.PropTypes.string,
        styleType: React.PropTypes.number,
        inputType: React.PropTypes.number,
        onPickerDone: React.PropTypes.func,
        radioData: React.PropTypes.array,
    }
    static defaultProps = {
        labelProps: {},
        textInputProps: {},
        valid: true,
        errorMsg: "",
        styleType: LabelInput.STYLE_TYPE.WHITE,
        inputType: LabelInput.INPUT_TYPE.INPUT,
        radioData: [],
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
        let labelColor, bottomBorderColor, inputTextColor, bottomBorderWidth;
        switch (styleType) {
            case LabelInput.STYLE_TYPE.WHITE:
                labelColor = Colors.white;
                bottomBorderColor = Colors.white;
                inputTextColor = Colors.white;
                bottomBorderWidth = .5;
                break;
            case LabelInput.STYLE_TYPE.BLACK:
                labelColor = Colors.textGrey;
                bottomBorderColor = Colors.textGrey;
                inputTextColor = Colors.textGrey;
                bottomBorderWidth = .5;
                break;
            case LabelInput.STYLE_TYPE.GREY:
                labelColor = Colors.textGrey;
                bottomBorderColor = Colors.textLightGrey;
                inputTextColor = Colors.textGrey;
                bottomBorderWidth = 1;
                break;
            case LabelInput.STYLE_TYPE.DISABLED:
                labelColor = Colors.textLightGrey;
                bottomBorderColor = Colors.textLightGrey;
                inputTextColor = Colors.textLightGrey;
                bottomBorderWidth = 1;
                break;
        }


        let inputContent;
        switch (inputType) {
            case LabelInput.INPUT_TYPE.INPUT:
                inputContent = (
                    <TextInput
                        style={
                            [
                                Texts.Font_16_400,
                                {
                                    borderBottomWidth: bottomBorderWidth,
                                    borderBottomColor: valid ? bottomBorderColor : Colors.red,
                                    marginTop: 12,
                                    paddingBottom: 5,
                                    color: inputTextColor,
                                }
                            ]}
                        {...textInputProps}
                    />
                );
                break;
            case LabelInput.INPUT_TYPE.PICKER:
                inputContent = (
                    <TouchableOpacity onPress={this._onTextInputPress.bind(this)} style={[
                        {
                            borderBottomWidth: bottomBorderWidth,
                            borderBottomColor: valid ? bottomBorderColor : Colors.red,
                            marginTop: 12,
                            paddingBottom: 5,
                        }
                    ]}>
                        <Text style={[Texts.Font_16_400, {color: inputTextColor}]}>{date}</Text>
                    </TouchableOpacity>
                )
                break;
            case LabelInput.INPUT_TYPE.TEXT:
                inputContent = (
                    <View>
                        <Text
                            style={
                                [
                                    Texts.Font_16_400,
                                    {
                                        marginTop: 12,
                                        paddingBottom: 5,
                                        color: inputTextColor,
                                    }
                                ]}
                        >{textInputProps.value}</Text>
                        <Dash style={{flex: 1, height: 1}} dashColor={bottomBorderColor} dashThickness={1}/>
                    </View>
                );
                break;
            case LabelInput.INPUT_TYPE.RADIO:
                inputContent = (
                    <View style={{marginTop: 12, flexDirection: "row"}}>
                        {this.props.radioData.map((data, index) =>
                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}} key={index}>
                                <Image resizeMode="contain"
                                       style={{marginRight: 8}}
                                       source={data.isChecked ? require('../res/images/radio-checked-disabled.png') : require('../res/images/radio-uncheck-disabled.png')}/>
                                <Text style={[Texts.Font_16_400, {color: inputTextColor}]}>{data.label}</Text>
                            </View>
                        )}
                    </View>
                );
                break;
        }

        return (
            <View style={style}>
                <Text style={[Texts.Font_14_400, {color: valid ? labelColor : Colors.red}]}
                      {...labelProps}>
                    {labelText}
                </Text>

                {inputContent}

                {(!valid && errorMsg) ?
                    <Text style={[Texts.Font_14_400, {color: Colors.red}]}>
                        {errorMsg}
                    </Text>
                    : null}

                {inputType === LabelInput.INPUT_TYPE.PICKER ?
                    <DatePicker
                        style={{width: 0, height: 0, backgroundColor: "red"}}
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
