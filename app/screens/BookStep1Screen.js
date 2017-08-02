import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'
import OptionButton from '../componenets/OptionButton'
import {GENDER} from '../Enum'


class BookStep1Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPackage : "",
        };
        this._packages = [
            {
                key: "A1",
                title: "菁英防癌健檢",
                gender: GENDER.MALE,
                price: "NT$100,000",
                activeColor: "#BFE6F4",
            },
            {
                key: "A2",
                title: "菁英防癌健檢",
                gender: GENDER.FEMALE,
                price: "NT$116,000",
                activeColor: "#BFE6F4",
            },
            {
                key: "B1",
                title: "防癌健檢",
                gender: GENDER.MALE,
                price: "NT$71,000",
                activeColor: "#D7EEF7",
            },
            {
                key: "B2",
                title: "防癌健檢",
                gender: GENDER.FEMALE,
                price: "NT$73,000",
                activeColor: "#D7EEF7",
            },

            {
                key: "C1",
                title: "精準健檢",
                gender: GENDER.MALE,
                price: "NT$24,000",
                activeColor: "#CAE7E5",
            },
            {
                key: "C2",
                title: "精準健檢",
                gender: GENDER.FEMALE,
                price: "NT$27,000",
                activeColor: "#CAE7E5",
            },
        ]


    }
    static navigationOptions = {
        title: 'Book Appointment',
        tabBarVisible: false,
    };

    grids() {
        let packages = {};
        this._packages.forEach((p) => {
            let priceItem = {
                key: p.key,
                price: p.price,
                activeColor: p.activeColor,
            };
            if(!packages[p.title]) {
                packages[p.title] = {};
            }
            packages[p.title][p.gender] = priceItem;
        });


        let grids = [];
        for(let key in packages) {
            let pge = packages[key];
            let gridColor = (this.state.selectedPackage === pge[GENDER.MALE].key || this.state.selectedPackage === pge[GENDER.FEMALE].key) ? pge[GENDER.MALE].activeColor : Colors.inactivePackageGrid;
            grids.push (
                <View key={key} style={{flexDirection: "row", height: 173, borderBottomWidth: 1, borderColor: Colors.deepGrey}}>
                    <View style={{padding: 16,justifyContent: "center", alignItems: "center" ,width: 125,backgroundColor: gridColor}}><Text style={Texts.Font_20_400}>{key}</Text></View>

                    <View style={{flex: 1,flexDirection: "column", backgroundColor: Colors.white}}>
                        <View style={{flex: 1,flexDirection: "row", padding: 16, alignItems: "center", borderBottomWidth: 1, borderColor: Colors.grey}}>
                            <OptionButton buttonStyle={{marginRight: 8}} id={pge[GENDER.MALE].key} isSelected={this.state.selectedPackage === pge[GENDER.MALE].key} onPress={id => this.setState({selectedPackage: id})} />
                            <Text style={{marginRight: 8}}>男</Text>
                            <Text style={{marginRight: 8}}>{pge[GENDER.MALE].price}</Text>
                        </View>
                        <View style={{flex: 1,flexDirection: "row", padding: 16, alignItems: "center"}}>
                            <OptionButton buttonStyle={{marginRight: 8}} id={pge[GENDER.FEMALE].key} isSelected={this.state.selectedPackage === pge[GENDER.FEMALE].key} onPress={id => this.setState({selectedPackage: id})} />
                            <Text style={{marginRight: 8}}>女</Text>
                            <Text style={{marginRight: 8}}>{pge[GENDER.FEMALE].price}</Text>
                        </View>
                    </View>

                </View>
            )
        }
        return grids;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    padding: 16,
                    height: 36,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                }}>
                    <Text style={{
                        ...Texts.Font_14_600,
                        color: Colors.white,
                    }}>1. Select Package</Text>
                </View>
                <ScrollView style={{flex: 1, flexDirection: "column"}}>
                    {this.grids()}
                </ScrollView>

                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }}  onPress={() => this.props.navigate({routeName: Routes.BookStep2})}
                >
                    <Text  style={{
                        ...Texts.Font_17_600,
                        color: Colors.white,
                    }}>Continue</Text>
                </LockButton>
            </View>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStep1Screen);
