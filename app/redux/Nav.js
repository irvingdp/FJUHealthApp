import ActionType from './ActionTypes'
import {NavigationActions} from 'react-navigation';
import {TabBarNavigator} from '../navigation/TabNav';
import Routes from '../navigation/Routes'
import NavLogic from '../navigation/NavLogic'
import ReduxReservation from './Reservation'

const initialState = null;

//TODO: where is to put logout button?
let Reducer = (state = initialState, action) => {
    let nextState;
    let currentTabNav;
    switch (action.type) {
        case ActionType.NAVIGATE:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.navigate(action.data),
                state);
            break;

        case ActionType.BACK:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;

        case ActionType.NAVIGATE_REPLACE:
            currentTabNav = state.routes[state.index];
            currentTabNav.routes.pop(); // pop the current route
            currentTabNav.index = currentTabNav.index - 1;
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.navigate(action.data),
                state
            );
            break;

        case ActionType.LOGIN_SUCCESS:
        case ActionType.REGISTER_SUCCESS:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;

        case ActionType.FORGET_PASSWORD_SUCCESS:
            currentTabNav = state.routes[state.index];
            currentTabNav.routes.pop(); // pop the current route
            currentTabNav.index = currentTabNav.index - 1;
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: Routes.ForgetPasswordSuccess}),
                state
            );
            break;

        case ActionType.LOGOUT:
        case ActionType.NAVIGATE_RESET:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate(action.data || {routeName: Routes.Dashboard}),
                    ]
                }),
                state);
            break;
        
        default:
            nextState = TabBarNavigator.router.getStateForAction(action,
                state);
            break;
    }
    if(action.data && action.data.props) {
        nextState.props = {...action.data.props}
    } else {
        nextState.props = undefined;
    }
    return nextState || state;
};

let ActionCreator = {
    reset(route) {
        return function (dispatch) {
            return dispatch({
                type: ActionType.NAVIGATE_RESET,
                data: route,
            });
        }
    },
    replace(route) {
        return function (dispatch) {
            return dispatch({
                type: ActionType.NAVIGATE_REPLACE,
                data: route,
            });
        }
    },
    navigate(route) {
        return function (dispatch, getState) {
            let nextRoute = NavLogic.getNextNavigateRoute(route, getState());
            return dispatch({
                type: ActionType.NAVIGATE,
                data: nextRoute,
            });
        }
    },
    back() {
        return function (dispatch) {
            return dispatch({
                type: ActionType.BACK,
            });
        }
    },
};


export default {ActionCreator, Reducer};

