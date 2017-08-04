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
import ReduxNav from '../redux/Nav'

class BookSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        title: 'Book Success',
        tabBarVisible: false,
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    padding: 16,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        ...Texts.Font_14_600,
                    }}>Thanks</Text>
                </View>


                <LockButton buttonStyle={{
                    height: 50,
                    backgroundColor: Colors.green,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={
                    () => this.props.navigate({routeName: Routes.Dashboard})
                    //TODO: reset the route
                }
                >
                    <Text style={{
                        ...Texts.Font_17_600,
                        color: Colors.white,
                    }}>GO DashBoard</Text>
                </LockButton>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    navigate: (route) => dispatch(ReduxNav.ActionCreator.navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSuccessScreen);
