import React, {Component} from 'react'
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import {
    ActivityIndicator,
    Dimensions,
    View
} from 'react-native'

export default class Spinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {width, height} = Dimensions.get('window');
        return(
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                position: 'absolute',
                width: width,
                height: height,
                zIndex: 999,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ActivityIndicator
                    animating={true}
                    color="white"
                    size="large"
                />
            </View>
        )
    }
}
