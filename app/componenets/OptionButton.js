import React, {Component} from 'react'
import {
    TouchableOpacity,
    Image
} from 'react-native'

export default class OptionButton extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        buttonStyle: React.PropTypes.object,
        onPress: React.PropTypes.func,
        value: React.PropTypes.object,
    }
    static defaultProps = {
        buttonStyle: {},
        onPress: () => {},
    }
    render() {
        return (
            <TouchableOpacity style={this.props.buttonStyle}
                              onPress={() => {
                                  this.props.onPress && this.props.onPress(this.props.value);
                              }}
            >
                {this.props.isSelected ?
                    <Image resizeMode="contain"
                           source={require('../res/images/circle-checked.png')}/>
                    :
                    <Image resizeMode="contain"
                           source={require('../res/images/circle-normal.png')}/>
                }
            </TouchableOpacity>
        )
    }
}
