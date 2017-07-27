import React, {Component} from 'react'
import {
    TextInput,
    Text,
    View
} from 'react-native'
import {Texts, Layouts, Colors} from '../styles/BaseStyles'

export default class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        error: React.PropTypes.object,
    }
    render() {
        let {error} = this.props;
        let message = (error && error.message) || null;
        return !!message ? (
                    <Text style={[Texts.Font_14_400, {color: Colors.red, marginTop: 10}]}>
                        {message}
                    </Text>
        ) : null
    }
}
