import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import AppLabels from '../AppLabels';
import ToggleBox from 'react-native-show-hide-toggle-box'
import {Layouts, Colors} from '../styles/BaseStyles'

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
                label: "一般檢查",
                value: "",
                content: [
                    "身高、體重、血壓、脈搏、BMI",
                    "身體的初步評估，以了解基本功能狀況",
                ]
            },
            {
                label: "體脂肪檢測",
                value: "",
                content: [
                    "體內脂肪、骨骼、肌肉、水份等含量比例分析、肥胖程度測定。",
                ]
            },
            {
                label: "醫師理學檢查",
                value: "",
                content: [
                    "口腔、頸部、心音、神經系統、胸部、腹部、皮膚、四肢等聽、觸診與病史詢問",
                    "甲狀腺、淋巴腺、心雜音、皮膚、靜脈曲張、氣喘、腹部、肺部、下肢水腫疾病等。",
                ]
            },
            {
                label: "眼科檢查",
                value: "",
                content: [
                    "氣壓式眼壓測定(請勿配戴隱形眼鏡)",
                    "利用氣體吹到角膜、視其對角膜之抗力來測量眼壓，臨床上可作為是否有青光眼的重要參考。",
                ]
            },
            {
                label: "血液常規檢查",
                value: "",
                content: [
                    "貧血分類(如缺鐵性、海洋性貧血)、血液凝固功能、白血病(血癌)、血小板缺少紫斑病、細菌性感染、免疫性疾病。",
                ]
            },
            {
                label: "肝功能檢查",
                value: "",
                content: [
                    "檢查是否有急慢性肝炎、肝硬化、肝膽功能異常、肝腫瘤及膽道阻塞、營養狀態等症狀。",
                ]
            },
            {
                label: "膽囊功能檢查",
                value: "",
                content: [
                    "膽道阻塞、膽結石、膽管炎、黃疸症、肝病變、肝炎。",
                ]
            },
            {
                label: "腎功能檢查",
                value: "",
                content: [
                    "急慢性腎炎、腎衰竭、尿毒症、腎臟機能障礙。",
                ]
            },
            {
                label: "痛風檢查",
                value: "",
                content: [
                    "檢查腎臟有無代謝性功能障礙、尿毒症、痛風或腎炎。",
                ]
            },
            {
                label: "心血管危險因子檢查",
                value: "",
                content: [
                    "脂肪代謝異常、血液循環功能、動脈硬化症、潛在性心臟血管病變危險因子評估。",
                ]
            },
            {
                label: "雙光子骨質密度量測",
                value: "",
                content: [
                    "骨質疏鬆及流失情況、骨折預防評估。",
                ]
            },
            {
                label: "綜合解說報告",
                value: "",
                content: [
                    "健康問題諮詢，以及後續轉診服務。",
                ]
            },
            {
                label: "檢查報告書及手冊",
                value: "",
                content: [
                    "提供詳實的檢查報告書及精美健康手冊。",
                    "保存健康檢查結果，逐年比對健康狀態。健康手冊提供您更多健康保健知識。	",
                ]
            },
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

