import React, {Component} from 'react'
import {
    TouchableOpacity,
} from 'react-native'

export default class LockButton extends Component {
    constructor(props) {
        super(props);
        this.disabled = false;
    }

    static propTypes = {
        buttonStyle: React.PropTypes.object,
        clickLockTime: React.PropTypes.number,
        onPress: React.PropTypes.func,
    }
    static defaultProps = {
        buttonStyle: {},
        clickLockTime: 2000,
        onPress: () => {},
    }

    _onPress() {
        if(!this.disabled) {
            this.disabled = true;
            this.props.onPress && this.props.onPress();
            setTimeout(()=>{
                this.disabled = false;
            },this.props.clickLockTime);
        }
    }

    render() {
        let {buttonStyle} = this.props;
        return(
            <TouchableOpacity style={buttonStyle}
                onPress={this._onPress.bind(this)}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}
