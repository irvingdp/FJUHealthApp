import React, {Component} from 'react'
import {
    Text,
} from 'react-native'
import LockButton from '../LockButton';
import {Layouts, Colors, Texts} from '../../styles/BaseStyles'

export default class CardButton extends Component {
    static propTypes = {
        onPress: React.PropTypes.func,
        buttonText: React.PropTypes.string,
        enable: React.PropTypes.bool,
    }
    static defaultProps = {
        onPress: () => {
        },
        buttonText: "",
        enable: true,
    }

    render() {
        return (
            <LockButton onPress={() => this.props.onPress()} buttonStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 32,
                borderColor: this.props.enable ? Colors.green : Colors.greye7,
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 12
            }}>
                <Text style={[{
                    textAlign: "center",
                    color: this.props.enable ? Colors.green : Colors.textLightGrey,
                }, Texts.Font_14_600]}>{this.props.buttonText}</Text>
            </LockButton>
        )
    }
}
