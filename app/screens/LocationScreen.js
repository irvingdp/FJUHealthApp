import React, {Component} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image, Linking} from 'react-native';
import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';
import AppLabels from '../AppLabels';
import MapView from 'react-native-maps';
import {Colors, Texts} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;
const REGION = {
    latitude : 25.03646841942772,
    longitude : 121.428477,
    latitudeDelta : LATITUDE_DELTA,
    longitudeDelta : LATITUDE_DELTA * ASPECT_RATIO,
};
const MARK_REGION = {
    latitude : 25.0400399,
    longitude : 121.428477,
}

const ADDRESS = AppLabels.LocationScreen.address;

class LocationScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: AppLabels.LocationScreen.title,
    };

    _goDirection() {
        let googleMapUrl = 'comgooglemaps://?daddr=' + ADDRESS + '&directionsmode=driving';
        let appleMapUrl = 'http://maps.apple.com/?daddr=' + ADDRESS;
        let webGoogleMapUrl = 'https://maps.google.com/maps?saddr=Current+Location&daddr=' + ADDRESS + '&dirflg=d';

        //map application prior : google map app > web google map > apple map app
        Linking.canOpenURL(googleMapUrl).then(supported => {
            if (supported)
                Linking.openURL(googleMapUrl);
            else
                return Linking.canOpenURL(webGoogleMapUrl)
        }).then(supported => {
            if (supported)
                Linking.openURL(webGoogleMapUrl);
            else
                return Linking.canOpenURL(appleMapUrl)
        }).then((supported) => {
            if (supported)
                Linking.openURL(appleMapUrl);
        }).catch(() => 0)
    }

    render() {
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "flex-end"
            }}>
                <MapView
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    region={REGION}
                    scrollEnabled={false}
                >
                    <MapView.Marker coordinate={MARK_REGION}>
                    </MapView.Marker>
                </MapView>
                <View style={{backgroundColor: Colors.white, margin: 16}}>
                    <View style={{padding: 20}}>
                        <Text style={[{textAlign: 'center'},Texts.Font_16_400]}>{AppLabels.LocationScreen.hospitalName}</Text>
                        <Text style={[{textAlign: 'center', marginTop: 5},Texts.Font_16_400]}>{AppLabels.LocationScreen.address}</Text>
                    </View>
                    <LockButton buttonStyle={{flexDirection: 'row', backgroundColor: Colors.green, height: 44, padding:12, justifyContent:'center', alignItems:'center'}}
                                onPress={() => this._goDirection()}>
                        <Image style={{marginRight: 5}} resizeMode="contain" source={require('../res/images/peach.png')}/>
                        <Text style={[{textAlign: 'center',textAlignVertical: 'center', color: Colors.white}, Texts.Font_17_600]}>{AppLabels.LocationScreen.navigation}</Text>
                    </LockButton>
                </View>

                <View style={{backgroundColor: Colors.white,margin: 16, marginTop: 0,padding: 20}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}>
                        <Image style={{marginRight: 3}} resizeMode="contain" source={require('../res/images/train.png')}/>
                        <Text style={[{textAlign: 'center',textAlignVertical: 'center', color: Colors.green}, Texts.Font_17_600]}>{AppLabels.LocationScreen.mrt}</Text>
                    </View>
                    <Text style={[{textAlign: 'center', marginTop: 10},Texts.Font_16_400]}>{AppLabels.LocationScreen.mrtInfo1}</Text>
                    <Text style={[{textAlign: 'center', marginTop: 5},Texts.Font_16_400]}>{AppLabels.LocationScreen.mrtInfo2}</Text>

                    <View style={{marginTop: 24,justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}>
                        <Image style={{marginRight: 3}} resizeMode="contain" source={require('../res/images/bus.png')}/>
                        <Text style={[{textAlign: 'center',textAlignVertical: 'center', color: Colors.green}, Texts.Font_17_600]}>{AppLabels.LocationScreen.bus}</Text>
                    </View>
                    <Text style={[{marginTop: 20,textAlign: 'center', marginTop: 5},Texts.Font_16_400]}>{AppLabels.LocationScreen.busInfo}</Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    navigate: (routeName) => dispatch(ReduxNav.ActionCreator.navigate(routeName)),
});
export default connect(null, mapDispatchToProps)(LocationScreen);

