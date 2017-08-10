import React, {Component} from 'react'
import ReduxNav from '../redux/Nav'
import {connect} from 'react-redux';
import {
    Image,
} from 'react-native'
import LockButton from '../componenets/LockButton';
import NavLogic from '../navigation/NavLogic';

class NavBackButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            NavLogic.canBack(this.props.nav) === true ?
                <LockButton onPress={() => this.props.back()} buttonStyle={{marginLeft: 10}}>
                    <Image
                        source={require('../res/images/back-green.png')}
                        resizeMode={"contain"}
                    />
                </LockButton>
                : null
        )
    }
}

const mapStateToProps = state => ({
    nav: state.Nav,
});
const mapDispatchToProps = dispatch => ({
    back: () => dispatch(ReduxNav.ActionCreator.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBackButton);
