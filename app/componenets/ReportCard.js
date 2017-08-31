import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'
import moment from 'moment'

export default class ReportCard extends Component {
    static propTypes = {
        report: React.PropTypes.object,
    };
    static defaultProps = {
        report: {},
    };
    render() {
        if(!this.props.report){
            return null;
        }
        return (
            <TouchableOpacity style={{height: 82, backgroundColor: Colors.white, paddingTop: 16, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, borderRadius: 8, marginTop: 12, flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}>
                <View>
                    <Text style={[Texts.Font_20_400, {color: Colors.textBlack,}]}>{this.props.report.reservation.package.title}</Text>
                    <Text style={[Texts.Font_14_400, {color: Colors.textGrey, marginTop: 8}]}>{moment(this.props.report.reservation.reserveDate).format("YYYY-MM-DD")}</Text>
                </View>
                <View style={{flexDirection: 'row',alignItems:"center"}}>
                    <View style={{width: 43,paddingLeft: 5, paddingRight: 5, paddingTop: 2,paddingBottom: 2, backgroundColor: Colors.green, borderRadius: 5, marginRight: 12}}>
                        <Text style={[Texts.Font_14_400, {color: Colors.white}]}>NEW</Text>
                    </View>
                    <Image
                        source={require('../res/images/right-arrow.png')}
                        resizeMode={"contain"}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}