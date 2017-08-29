import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import AppLabels from '../AppLabels';
import {Texts, Colors} from '../styles/BaseStyles'
import TabView from '../componenets/TabView'
import PackageCard from '../componenets/PackageCard'
import {PackageData} from '../PackageData'

class PackageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navigation = {
            index: 0,
            routes: [
                {
                    key: '0',
                    title: PackageData.find(p => p.key === 0).title,
                    content: this.createTabContent(0)
                },
                {
                    key: '1',
                    title: PackageData.find(p => p.key === 1).title,
                    content: this.createTabContent(1)
                },
                {
                    key: '2',
                    title: PackageData.find(p => p.key === 2).title,
                    content: this.createTabContent(2)
                }
            ],
        };
    }

    static navigationOptions = {
        title: AppLabels.PackageScreen.title,
    };

    createTabContent(key) {
        let data = PackageData.find(p => p.key === key);
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

    render() {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: Colors.grey,
            }}>
                <View style={{backgroundColor: Colors.white, paddingTop: 28, paddingBottom: 20}}>
                    <View style={{paddingRight: 32, paddingLeft: 32}}>
                        <Text style={[Texts.Font_17_600, {color: Colors.textBlack, textAlign: 'center'}]}>Our Screening
                            Solutions</Text>
                        <Text
                            style={[Texts.Font_16_400, {marginTop: 12, color: Colors.textBlack, textAlign: 'center'}]}>Complete
                            with a
                            personal
                            consultation, lifestyle counselling, medical review, medical report and much more.</Text>
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
                        }]}>菁英</Text>
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
                    }]}>〈輔大校友、教友和教職員、新五泰的鄰居及企業客戶，享有專案特惠安排〉</Text>
                </View>

                {this.createDividers()}

                <TabView
                    navigation={this.navigation}
                    parentIsScrollView={true}
                    pageStyle={{backgroundColor: Colors.white}}
                />

                {this.createDividers()}

            </ScrollView>
        )
    }
}

export default PackageScreen;

