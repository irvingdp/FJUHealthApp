
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Store from './app/redux/Store';
import TabNav from './app/navigation/TabNav';

class FJUHealthApp extends React.Component {

    render() {
        return (
            <Provider store={Store}>
              <TabNav />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('FJUHealthApp', () => FJUHealthApp);

export default FJUHealthApp;

