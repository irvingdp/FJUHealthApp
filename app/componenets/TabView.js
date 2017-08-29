import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
} from 'react-native';
import {TabViewAnimated, TabBar, TabViewPagerPan} from 'react-native-tab-view';
import {Texts, Colors, NavBarHeight} from '../styles/BaseStyles'
const TabBarHeight = 49;

export default class TabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
        };
        this._renderHeader = this._renderHeader.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._handleChangeTab = this._handleChangeTab.bind(this);
        this._sceneRef = [];
        this._containerViewRef = null;
        this._eachTabHeights = [];
    }

    //only accept when this.props.parentIsScrollView is true.
    //FULL_SCREEN: the min height of RbzTabView will be the (screen's height - navBar - tabBar) , max height will be the current tab content height.
    //FIT_CONTENT: TabView's height will be the current tab content height.
    //MAX_CONTENT: TabView's height will be the highest tab content height.
    static AdjustPageHeightMode = {
        FULL_SCREEN: 0,
        FIT_CONTENT: 1,
        MAX_CONTENT: 2,
    }
    static propTypes = {
        navigation: React.PropTypes.object.isRequired,
        containerStyle: React.PropTypes.object,
        headerStyle: React.PropTypes.object,
        indicatorStyle: React.PropTypes.object,
        onIndexChange: React.PropTypes.func,
        parentIsScrollView: React.PropTypes.bool,
        tabBarHeight: React.PropTypes.number,
        pageStyle: React.PropTypes.any,
        adjustPageHeightMode: React.PropTypes.number,
        swipeEnabled: React.PropTypes.bool,
    };
    static defaultProps = {
        parentIsScrollView: false,
        containerStyle: {},
        indicatorStyle: {
            backgroundColor: Colors.tabBarGreen,
            height: 3,
        },
        headerStyle: {
            backgroundColor: Colors.white,
            height: 49,
            borderColor: Colors.deepGrey,
            borderBottomWidth: 1,
            justifyContent: 'center',
            //elevation: null,
        },
        headerActiveTextStyle: {
            ...Texts.Font_16_900,
            color: Colors.tabBarGreen,
            textAlign: "center",
        },
        headerInactiveTextStyle: {
            ...Texts.Font_16_900,
            color: Colors.textGrey,
            textAlign: "center",
        },
        navigation: {
            index: 0,
            routes: [
                {
                    key: '0',
                    title: 'First',
                    content: <View style={[{flex: 1, backgroundColor: 'black'}]}/>
                },
                {
                    key: '1',
                    title: 'Second',
                    content: <View style={[{flex: 1, backgroundColor: 'pink'}]}/>
                },
                {
                    key: '2',
                    title: 'Third',
                    content: <View style={[{flex: 1, backgroundColor: 'red'}]}/>
                },
            ],
        },
        tabBarHeight: TabBarHeight,
        pageStyle: {backgroundColor: "transparent"},
        adjustPageHeightMode: TabView.AdjustPageHeightMode.FULL_SCREEN,
        swipeEnabled: true,
    };

    _swipePage(index) {
        this.setState({
            navigation: {...this.state.navigation, index},
        });
    }

    _adjustPageHeight(currentIndex) {
        let height = 0, navHeight = NavBarHeight;
        let maxPageAvailableHeight = Dimensions.get('window').height - this.props.tabBarHeight - navHeight;

        switch (this.props.adjustPageHeightMode) {
            case 0: //FULL_SCREEN
                height = Math.max(this._eachTabHeights[currentIndex], maxPageAvailableHeight);
                break;
            case 1: //FIT_CONTENT
                height = this._eachTabHeights[currentIndex];
                break;
            case 2: //MAX_CONTENT
                height = Math.max(...this._eachTabHeights);
                break;
        }
        return height;
    }

    _handleChangeTab(index) {
        this.props.parentIsScrollView && this._containerViewRef.setNativeProps({
            style: {
                height: this._adjustPageHeight(index),
            }
        });
        this.setState({
            navigation: {...this.state.navigation, index}
        });
        this.props.onIndexChange && this.props.onIndexChange(index);
    }

    _renderHeader(props) {
        return (
            <TabBar
                {...props}
                indicatorStyle={this.props.indicatorStyle}
                pressColor='rgba(0, 0, 0)'
                style={this.props.headerStyle}
                renderLabel={this._renderLabel}
            />
        );
    };

    _renderLabel({route}) {
        let isSelectedRoute = this.state.navigation.routes[this.state.navigation.index].key === route.key;
        return route.title ? <Text style={isSelectedRoute ? this.props.headerActiveTextStyle : this.props.headerInactiveTextStyle }>{route.title}</Text> : null
    }

    _renderScene({route}) {
        let setMyHeight = (e) => {
            this._eachTabHeights[route.key] = e.nativeEvent.layout.height + this.props.headerStyle.height;
        };
        let props = {
            style: [this.props.pageStyle, this.props.parentIsScrollView ? {} : {flex: 1}],
            ref: ref => ref && (this._sceneRef[route.key] = ref),
            onLayout: (e) => setMyHeight(e),
        };
        return (
            <View {...props} >
                {this.props.navigation.routes.find((r) => r.key === route.key).content}
            </View>
        )
    }
    _renderPager = props => {
        return <TabViewPagerPan {...props} swipeEnabled={this.props.swipeEnabled}/>;
    };
    render() {
        let tabView = (
            <TabViewAnimated
                style={[{flex: 1}, this.props.containerStyle]}
                navigationState={this.state.navigation}
                renderHeader={this._renderHeader}
                renderScene={this._renderScene}
                renderPager={this._renderPager}
                onIndexChange={this._handleChangeTab}
            />
        )
        return (
            this.props.parentIsScrollView ?
                <View ref={ref => ref && (this._containerViewRef = ref)}
                      style={{backgroundColor: this.props.pageStyle.backgroundColor || "transparent"}}
                >
                    {tabView}
                </View>
                : tabView
        );
    }
}