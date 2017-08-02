import ActionType from './ActionTypes'
import {NavigationActions} from 'react-navigation';
import {TabBarNavigator} from '../navigation/TabNav';
import Routes from '../navigation/Routes'

const initialState = null;

//TODO: back button icon
//TODO: where to put logout button?
let getNextNavigateRoute = (route, state) => {
    let nextRouteName = route && route.routeName;
    let nextRoute = {...route};
    switch (nextRouteName) {
        case Routes.BookStep1:
            if(!state.Auth.isLoggedIn) {
                nextRoute = {
                    ...route,
                    routeName: Routes.Login,
                }
            } else {
                nextRoute = {
                    ...route,
                    routeName: Routes.BookStep1,
                }
            }
            break;
        default:
            break;
    }
    return nextRoute;
}
let Reducer = (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case ActionType.NAVIGATE:
            let nextRoute = getNextNavigateRoute(action.data, action.state);
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.navigate(nextRoute),
                state);
            break;

        case ActionType.BACK:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;

        case ActionType.NAVIGATE_REPLACE:
            //TODO: Is this a correct way to replace the route?
            let currentTabNav = state.routes[state.index];
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



        case ActionType.LOGOUT:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: Routes.Dashboard}),
                    ]
                }),
                state);
            break;

        default:
            nextState = TabBarNavigator.router.getStateForAction(action,
                state);
            break;
    }
    return nextState || state;
};

let ActionCreator = {
    replace(route) {
        return function (dispatch, getState) {
            return dispatch({
                type: ActionType.NAVIGATE_REPLACE,
                data: route,
                state: getState(),
            });
        }
    },
    navigate(route) {
        return function (dispatch, getState) {
            return dispatch({
                type: ActionType.NAVIGATE,
                data: route,
                state: getState(),
            });
        }
    },
    back() {
        return function (dispatch, getState) {
            return dispatch({
                type: ActionType.BACK,
                state: getState(),
            });
        }
    },
};

export default {ActionCreator, Reducer};

