
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Store from './app/redux/store';
import TabBarNavigation from './app/navigation/TabBarNavigation';

class FJUHealthApp extends React.Component {

    render() {
        return (
            <Provider store={Store}>
              <TabBarNavigation />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('FJUHealthApp', () => FJUHealthApp);

export default FJUHealthApp;

