import {combineReducers} from 'redux';

import Nav from './Nav';
import Auth from './Auth';
import Package from './Package';
import Reservation from './Reservation';

const AppReducer = combineReducers({
    Nav: Nav.Reducer,
    Auth: Auth.Reducer,
    Package: Package.Reducer,
    Reservation: Reservation.Reducer,
});

export default AppReducer;
