import React, {Component} from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import {Texts, Colors} from '../../styles/BaseStyles'
import moment from 'moment'
import CardButton from './CardButton'

export default class DashboardCard extends Component {
    static TYPE = {
        FINISH: "FINISH",
        PENDING: "PENDING",
        COMING: "COMING"
    }
    static propTypes = {
        type: React.PropTypes.string,
        title: React.PropTypes.string,
        date: React.PropTypes.string,
        description: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        onButtonPress: React.PropTypes.func,
    }
    static defaultProps = {
        type: DashboardCard.TYPE.COMING,
        title: null,
        date: null,
        description: null,
        buttonText: null,
        onButtonPress: null,
    }

    render() {
        let imageSource = null, topLineColor = null, bottomLineColor = null;

        switch (this.props.type) {
            case DashboardCard.TYPE.FINISH:
                imageSource = require('../../res/images/card-finish-icon.png');
                topLineColor = Colors.lineGreen;
                bottomLineColor = Colors.lineGreen;
                break;
            case DashboardCard.TYPE.PENDING:
                imageSource = require('../../res/images/card-pending-icon.png');
                topLineColor = Colors.lineGreen;
                bottomLineColor = Colors.greye7;
                break;
            case DashboardCard.TYPE.COMING:
                imageSource = require('../../res/images/card-coming-icon.png');
                topLineColor = Colors.greye7;
                bottomLineColor = Colors.greye7;
                break;
        }
        return (
            <View style={{flexDirection: "row", backgroundColor: Colors.white}}>
                <View style={{width: 48, flexDirection: "row", justifyContent: "center"}}>
                    <View style={{
                        zIndex: 98,
                        height: 22,
                        width: 2,
                        backgroundColor: topLineColor,
                        transform: [{translateX: 2}]
                    }}/>
                    <Image style={{zIndex: 99, marginRight: 3, position: "absolute", top: 22, transform: [{translateX: 1}]}} resizeMode="contain" source={imageSource}/>
                    <View style={{zIndex: 97, width: 2, backgroundColor: bottomLineColor}}/>
                </View>
                <View style={{
                    flex: 1,
                    borderColor: Colors.grey,
                    borderBottomWidth: 1,
                    paddingTop: 24,
                    paddingBottom: 24,
                    paddingRight: 16,
                }}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={[{color: this.props.type === DashboardCard.TYPE.COMING ? Colors.textLightGrey : Colors.green}, Texts.Font_14_600]}>{this.props.title}</Text>
                        {this.props.date ?
                            <Text
                                style={[{color: Colors.textLightGrey}, Texts.Font_14_600]}>{moment(this.props.date).format("YYYY-MM-DD")}</Text>
                            : null}
                    </View>
                    <View style={{marginTop: 6}}>
                        <Text style={[{color: this.props.type === DashboardCard.TYPE.COMING ? Colors.textLightGrey : Colors.textBlack}, Texts.Font_16_400]}>{this.props.description}</Text>
                        {this.props.buttonText && this.props.onButtonPress ?
                            <CardButton
                                onPress={() => this.props.onButtonPress()}
                                buttonText={this.props.buttonText}
                                enable={this.props.type !== DashboardCard.TYPE.COMING}
                            />
                            : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}