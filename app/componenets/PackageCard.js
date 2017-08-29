import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'


export default  class PackageCard extends Component {
    static propTypes = {
        data: React.PropTypes.object,
    };
    static defaultProps = {
        data: {
            title: "",
            items: []
        },
    };

    render() {
        return (
            <View style={{
                paddingTop: 16,
                paddingBottom: 16,
                paddingRight: 16,
                marginLeft: 16,
                backgroundColor: Colors.white,
                borderBottomWidth: 1,
                borderColor: Colors.grey
            }}>
                <Text style={[Texts.Font_16_600, {color: Colors.textBlack}]}>{this.props.data.title}</Text>
                {(this.props.data.items).map((item, index) =>
                    <View key={index} style={{
                        marginTop: 8,
                        paddingLeft: 8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Text style={[Texts.Font_16_400, {
                            textAlignVertical: "center",
                            marginBottom: 4,
                            marginTop: 4
                        }, {color: item.enable ? Colors.textBlack : Colors.textLightGrey}]}>{item.name}</Text>
                        <Image resizeMode="contain"
                               source={item.enable ? require('../res/images/package-tick.png') : require('../res/images/package-dot.png')}/>
                    </View>
                )}
            </View>
        )
    }
}