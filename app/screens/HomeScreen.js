import React, {Component} from 'react';
import ReduxNav from '../redux/Nav'

import {
    StyleSheet, View, Button, Text, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import Routes from '../navigation/Routes';
import LoginButton from '../componenets/LoginButton';
import AppLabels from '../AppLabels';
import {Layouts, Colors} from '../styles/BaseStyles'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        title: AppLabels.HomeScreen.title,
    };
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        go: PropTypes.func.isRequired,
    };

    render() {
        let triangle = {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 90,
            borderRightWidth: 90,
            borderBottomWidth: 170,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#6BCFF6'
        };
        let trapezoid1 = {
            width: 280,
            height: 0,
            borderBottomWidth: 100,
            borderBottomColor: '#83D0D3',
            borderLeftWidth: 50,
            borderLeftColor: 'transparent',
            borderRightWidth: 50,
            borderRightColor: 'transparent',
            borderStyle: 'solid',
            justifyContent: "center",
            alignItems: "center",
        };
        let trapezoid2 = {
            width: 400,
            height: 0,
            borderBottomWidth: 120,
            borderBottomColor: '#C2E8FA',
            borderLeftWidth: 60,
            borderLeftColor: 'transparent',
            borderRightWidth: 60,
            borderRightColor: 'transparent',
            borderStyle: 'solid',
            justifyContent: "center",
            alignItems: "center",
        };
        let {go, isLoggedIn} = this.props;
        return (
            <View style={[Layouts.centerLayout]}>
                <TouchableOpacity style={triangle} onPress={() => this.props.go({
                    routeName: Routes.Solution,
                    params: {solution: 'A'}
                })}>
                    <View style={{
                        position: "absolute",
                        top: 95,
                        right: -50,
                        zIndex: 99999,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{lineHeight: 25}}>{"菁英防癌健檢"}</Text>
                        <Text style={{lineHeight: 20}}>{"男  NT$100,000"}</Text>
                        <Text style={{lineHeight: 20}}>{"女  NT$116,000"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={trapezoid1} onPress={() => this.props.go({
                    routeName: Routes.Solution,
                    params: {solution: 'B'}
                })}>
                    <View style={{
                        marginTop: 100,
                        backgroundColor: 'transparent',
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99999,
                        position: "absolute",
                    }}>
                        <Text style={{lineHeight: 25}}>{"防癌健檢"}</Text>
                        <Text style={{lineHeight: 20}}>{"男  NT24,000"}</Text>
                        <Text style={{lineHeight: 20}}>{"女  NT27,000"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={trapezoid2} onPress={() => this.props.go({
                    routeName: Routes.Solution,
                    params: {solution: 'C'}
                })}>
                    <View style={{
                        marginTop: 130,
                        backgroundColor: 'transparent',
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99999,
                        position: "absolute",
                    }}>
                        <Text style={{lineHeight: 25}}>{"精準健檢"}</Text>
                        <Text style={{lineHeight: 20}}>{"男  NT24,000"}</Text>
                        <Text style={{lineHeight: 20}}>{"女  NT27,000"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const mapStateToProps = state => ({isLoggedIn: state.Auth.isLoggedIn});

const mapDispatchToProps = dispatch => ({
    go: (route) => dispatch(ReduxNav.ActionCreator.go(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

