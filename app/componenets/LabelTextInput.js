import React, {Component} from 'react'
import {
    TextInput,
    Text,
    View
} from 'react-native'
import {Texts, Layouts, Colors} from '../styles/BaseStyles'

export default class LabelTextInput extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        labelText: React.PropTypes.string,
        labelProps: React.PropTypes.object,
        textInputProps: React.PropTypes.object,
        errorMsg: React.PropTypes.string,
    }
    static defaultProps = {
        labelProps: {},
        textInputProps: {},
        valid: true,
        errorMsg: ""

    }
//TODO: IVAN 1.icon 2.clear & show pasword
    render() {
        let {labelProps, textInputProps, labelText, valid, errorMsg, style} = this.props;
        return (
            <View style={style}>
                <Text style={[Texts.Font_14_400, {color: valid ? Colors.white : Colors.red,}]}
                      {...labelProps}>
                    {labelText}
                </Text>
                <TextInput style={[Texts.Font_16_400, {
                    borderBottomWidth: 0.5,
                    borderBottomColor: valid ? Colors.white : Colors.red,
                    marginTop: 12,
                    paddingBottom: 5,
                    color: Colors.white
                }]}
                           {...textInputProps}/>
                {(!valid && errorMsg) ?
                    <Text style={[Texts.Font_14_400, {color: Colors.red}]}>
                        {errorMsg}
                    </Text>
                    : null
                }
            </View>
        )
    }
}
