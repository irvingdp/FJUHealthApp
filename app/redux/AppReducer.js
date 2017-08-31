import {combineReducers} from 'redux';

import Nav from './Nav';
import Auth from './Auth';
import Package from './Package';
import Reservation from './Reservation';
import Reserved from './Reserved';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Report from './Report';

const AppReducer = combineReducers({
    Nav: Nav.Reducer,
    Auth: Auth.Reducer,
    Package: Package.Reducer,
    Reservation: Reservation.Reducer,
    Reserved: Reserved.Reducer,
    Profile: Profile.Reducer,
    Dashboard: Dashboard.Reducer,
    Report: Report.Reducer,
});

export default AppReducer;
