import ReduxNav from '../redux/Nav'
import ReduxReservation from '../redux/Reservation'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Texts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton'
import OptionButton from '../componenets/OptionButton'
import {GENDER} from '../Enum'

class BookStep1Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem : {},
            validation: {
                package: null,
            }
        };
    }
    static navigationOptions = {
        title: 'Book Appointment',
        tabBarVisible: false,
    };
    _gridOnPress(group) {
        this.props.navigate({routeName: Routes.Package, props: {group: parseInt(group)}});
    }
    _createGrids() {
        let grids = [];
        for(let group in this.props.gridData) {
            let item = this.props.gridData[group];
            let gridColor = (this.state.selectedItem.id === item[GENDER.MALE].id || this.state.selectedItem.id === item[GENDER.FEMALE].id) ? item[GENDER.MALE].activeColor : Colors.inactivePackageGrid;
            grids.push (
                <TouchableOpacity key={group} style={{flexDirection: "row", height: 173, borderBottomWidth: 1, borderColor: Colors.deepGrey}} onPress={() => this._gridOnPress(group)}>
                    <View style={{padding: 16,justifyContent: "center", alignItems: "center" ,width: 125,backgroundColor: gridColor}}><Text style={Texts.Font_20_400}>{item[GENDER.MALE].title}</Text></View>
                    <View style={{flex: 1,flexDirection: "column", backgroundColor: Colors.white}}>
                        <View style={{flex: 1,flexDirection: "row", padding: 16, alignItems: "center", borderBottomWidth: 1, borderColor: Colors.grey}}>
                            <OptionButton buttonStyle={{marginRight: 8}} value={item[GENDER.MALE]} isSelected={this.state.selectedItem.id === item[GENDER.MALE].id} onPress={i => this.setState({selectedItem: i})} />
                            <Text style={{marginRight: 8}}>男</Text>
                            <Text style={{marginRight: 8}}>{item[GENDER.MALE].price}</Text>
                        </View>
                        <View style={{flex: 1,flexDirection: "row", padding: 16, alignItems: "center"}}>
                            <OptionButton buttonStyle={{marginRight: 8}} value={item[GENDER.FEMALE]} isSelected={this.state.selectedItem.id === item[GENDER.FEMALE].id} onPress={i => this.setState({selectedItem: i})} />
                            <Text style={{marginRight: 8}}>女</Text>
                            <Text style={{marginRight: 8}}>{item[GENDER.FEMALE].price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return grids;
    }
    _doClientValidation() {
        let selectedPackage = this.props.packages.find(p => p.id === this.state.selectedItem.id);
        if(selectedPackage) {
            this.props.setPackage(selectedPackage);
            this.props.navigate({routeName: Routes.BookStep2});
        } else {
            this.setState({
                validation:{
                    package: false,
                }
            });
        }
    }
    render() {
        console.log(this.state.selectedItem);
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
                    {this._createGrids()}
                </ScrollView>

                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }}  onPress={() => this._doClientValidation()}
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

const viewDataTransformer = {
    grids: (packages) => {
        let result = {};
        let colors = {
            1: "#BFE6F4",
            2: "#D7EEF7",
            3: "#CAE7E5",
        }
        packages && packages.forEach((p) => {
            if(!result[p.group]) {
                result[p.group] = {};
            }
            result[p.group][p.gender] = {
                id: p.id,
                price: p.displayPrice,
                activeColor: colors[p.group],
                title: p.title,
            };
        });
        return result;
    }
}
const mapStateToProps = state => ({
    packages: state.Package.data,
    gridData: viewDataTransformer.grids(state.Package.data),
    error: state.Package.fetchingPackageError,
});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
    setPackage: (pkg) => dispatch(ReduxReservation.ActionCreator.setPackage(pkg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookStep1Screen);
