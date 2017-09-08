
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Store from './app/redux/Store';
import TabNav from './app/navigation/TabNav';


//TODO: how to know the user locale and reset.. domain is ok , but how to reset the imported AppLables, may be put app labels to Redux
/*
import {changLocale} from './app/AppLabels'
import DomainCommon from './app/domain/Common';


changLocale("en-us");
DomainCommon.setLocale("en-us");
*/

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

