import {combineReducers} from 'redux';

import Nav from './Nav';
import Auth from './Auth';

const AppReducer = combineReducers({
    Nav: Nav.Reducer,
    Auth: Auth.Reducer,
});

export default AppReducer;
