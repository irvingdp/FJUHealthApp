
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './app/redux/reducers/index';
import AppWithNavigationState from './app/navigators/AppNavigator';

class FJUHealthApp extends React.Component {
    store = createStore(AppReducer);

    render() {
        return (
            <Provider store={this.store}>
              <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('FJUHealthApp', () => FJUHealthApp);

export default FJUHealthApp;

