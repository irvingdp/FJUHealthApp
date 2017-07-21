import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import AppLabels from '../AppLabels';
import {Colors} from '../styles/BaseStyles'
import ToggleBox from 'react-native-show-hide-toggle-box'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const solutionMap = {
    "A":"菁英防癌健檢",
    "B":"防癌健檢",
    "C":"精準健檢"
};
class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: solutionMap[navigation.state.params.solution ],
    });
    render() {
        const solution = this.props.navigation.state.params.solution;
        let data = [
            {
                label: "血脂肪",
                value: "",
                content: [
                    "總膽固醇, 三酸甘油脂",
                    "低密度膽固醇, 高密度膽固醇",
                ]
            },
            {
                label: "血脂肪2",
                value: "",
                content: [
                    "總膽固醇, 三酸甘油脂",
                    "低密度膽固醇, 高密度膽固醇",
                ]
            }
        ];
        let content = data.map((item, index)=> {
            return (
                <ToggleBox
                    key={index}
                    label={item.label}
                    value={item.value}
                    style={{backgroundColor: '#ddd', borderBottomWidth: 1}}
                >
                    <View style={{justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10,paddingRight: 10,paddingBottom: 30, paddingTop: 30}} >
                        {item.content.map((line,index) =>
                            <View key={'line'+index} >
                                <Text style={{lineHeight: 22}}>{line}</Text>
                            </View>

                        )}
                    </View>
                </ToggleBox>
            )
        })
        return (
            <ScrollView style={{backgroundColor: Colors.white}}>
                {content}
            </ScrollView>
        )
    }
}

export default Solution;

