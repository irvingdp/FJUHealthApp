import ReduxAuth from '../redux/Auth'
import ReduxNav from '../redux/Nav'
import Routes from '../navigation/Routes';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import {Texts, Layouts, Colors} from '../styles/BaseStyles'
import LockButton from '../componenets/LockButton';
import Spinner from '../componenets/Spinner'
import Header from "../componenets/Header";

class BookScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        title: 'BOOK',
    };

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.isFetching ? <Spinner /> : null}
                <Header/>
                <View style={{
                    flex: 1,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 40,
                    paddingTop: 40,
                    backgroundColor: Colors.lightGreen
                }}>
                    <Text>Book Screen</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);
