import ActionType from './ActionTypes'
import {NavigationActions} from 'react-navigation';
import {TabBarNavigator} from '../navigation/TabNav';
import Routes from '../navigation/Routes'

const initialState = null;

let getNextNavigateRoute = (route, state) => {
    let nextRouteName = route && route.routeName;
    let nextRoute = {...route};
    switch (nextRouteName) {
        case "Book":
            if(!state.Auth.isLoggedIn) {
                nextRoute = {
                    ...route,
                    routeName: Routes.Login,
                }
            } else {
                nextRoute = {
                    ...route,
                    routeName: Routes.Book,
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
            //let nextRoute = getNextNavigateRoute(action.data, action.state);
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

        case ActionType.LOGIN_SUCCESS:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.back(),
                state);
            break;

        case ActionType.REGISTER_SUCCESS:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: Routes.Dashboard}),
                state);
            break;
        /*
        case ActionType.LOGOUT:
            nextState = TabBarNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Dashboard'}),
                    ]
                }),
                state);
            break;
        */
        default:
            nextState = TabBarNavigator.router.getStateForAction(action,
                state);
            break;
    }
    return nextState || state;
};

let ActionCreator = {
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

