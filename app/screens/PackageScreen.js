import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import AppLabels from '../AppLabels';
import {Texts, Colors} from '../styles/BaseStyles'
import TabView from '../componenets/TabView'
import PackageCard from '../componenets/PackageCard'
import ReduxPackage from '../redux/Package'
import arrayUtils from '../utils/Array'

class PackageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = {
        title: AppLabels.PackageScreen.title,
    };

    createTabContent(group, packageDetails) {
        let data = packageDetails.find(p => p.group === group);
        return (
            (data.content).map((content, index) =>
                <PackageCard key={index} data={content}/>
            )
        )
    }

    createDividers() {
        return (
            <View style={{
                backgroundColor: Colors.grey,
                height: 16,
            }}/>
        )
    }

    componentDidMount() {
        this.props.getPackageDetails();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.navProps && nextProps.navProps.group && this.props.packageDetails) {
            var index = arrayUtils.findIndexInData(this.props.packageDetails, "group", nextProps.navProps.group);
            this._tabView._swipePage(index);
            this._scrollView.scrollTo({y: this._tabY})
        }
    }

    render() {
        let navigation = {};
        if(!this.props.packageDetails){
            return null
        } else {
            navigation = {
                index: 0,
                routes: [
                    {
                        key: '1',
                        group: 3,
                        title: this.props.packageDetails.find(p => p.group === 3).title,
                        content: this.createTabContent(3, this.props.packageDetails)
                    },
                    {
                        key: '2',
                        group: 2,
                        title: this.props.packageDetails.find(p => p.group === 2).title,
                        content: this.createTabContent(2, this.props.packageDetails)
                    },
                    {
                        key: '3',
                        group: 1,
                        title: this.props.packageDetails.find(p => p.group === 1).title,
                        content: this.createTabContent(1, this.props.packageDetails)
                    }
                ],
            };
        }
        return (
            <ScrollView
                style={{flex: 1, backgroundColor: Colors.grey}}
                ref={ref => this._scrollView = ref}
            >
                <View style={{backgroundColor: Colors.white, paddingTop: 28, paddingBottom: 20}}>
                    <View style={{paddingRight: 32, paddingLeft: 32}}>
                        <Text style={[Texts.Font_17_600, {color: Colors.textBlack, textAlign: 'center'}]}>{AppLabels.PackageScreen.ourPackages}</Text>
                        <Text style={[Texts.Font_16_400, {marginTop: 12, color: Colors.textBlack, textAlign: 'center'}]}>{AppLabels.PackageScreen.packageDescription}</Text>
                    </View>

                </View>
                <View style={{backgroundColor: Colors.white, alignItems: "center", paddingBottom: 20}}>
                    <Image style={{justifyContent: "center", alignItems: "center"}} resizeMode="contain"
                           source={require('../res/images/fill-1.png')}>
                        <Text style={[Texts.Font_20_400, {
                            color: Colors.textBlack,
                            textAlign: 'center',
                            backgroundColor: "transparent",
                            marginTop: 25
                        }]}>{"菁英"/* //TODO: how to localization package data */}</Text>
                        <Text style={[Texts.Font_20_400, {
                            color: Colors.textBlack,
                            textAlign: 'center',
                            backgroundColor: "transparent",
                            marginTop: 5
                        }]}>防癌健檢</Text>
                    </Image>
                    <Image style={{marginTop: 8, justifyContent: "center", alignItems: "center"}} resizeMode="contain"
                           source={require('../res/images/fill-2.png')}>
                        <Text style={[Texts.Font_20_400, {
                            color: Colors.textBlack,
                            textAlign: 'center',
                            backgroundColor: "transparent"
                        }]}>防癌健檢</Text>
                    </Image>
                    <Image style={{marginTop: 8, justifyContent: "center", alignItems: "center"}} resizeMode="contain"
                           source={require('../res/images/fill-3.png')}>
                        <Text style={[Texts.Font_20_400, {
                            color: Colors.textBlack,
                            textAlign: 'center',
                            backgroundColor: "transparent"
                        }]}>精準健檢</Text>
                    </Image>
                    <Text style={[Texts.Font_10_400, {
                        marginTop: 10,
                        color: Colors.textBlack,
                        textAlign: 'center',
                        backgroundColor: "transparent"
                    }]}>{AppLabels.PackageScreen.promotion}</Text>
                </View>

                {this.createDividers()}

                <View onLayout={(e)=> {this._tabY = e.nativeEvent.layout.y}}/>
                <TabView
                    ref={ref => this._tabView = ref}
                    navigation={navigation}
                    parentIsScrollView={true}
                    pageStyle={{backgroundColor: Colors.white}}
                    adjustPageHeightMode={TabView.AdjustPageHeightMode.FIT_CONTENT}
                />
                {this.createDividers()}

            </ScrollView>
        )   
    }
}

const mapStateToProps = state => ({
    navProps: state.Nav.props,
    packageDetails: state.Package.details,
});
const mapDispatchToProps = dispatch => ({
    getPackageDetails: () => dispatch(ReduxPackage.ActionCreator.getPackageDetails()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PackageScreen);






