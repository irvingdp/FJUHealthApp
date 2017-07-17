import {combineReducers} from 'redux';

import Nav from './Nav';
import Auth from './Auth';
import HomeNav from './HomeNav';

const AppReducer = combineReducers({
    Nav: Nav.Reducer,
    Auth: Auth.Reducer,
    HomeNav: HomeNav.Reducer,
});

export default AppReducer;
