import { combineReducers } from 'redux';

import tabBar from './tabBar';
import homeTab from './homeTab';
import reserveTab from './reserveTab';

import auth from './auth';

const AppReducer = combineReducers({
    tabBar,
    homeTab,
    reserveTab,
    auth,
});

export default AppReducer;
