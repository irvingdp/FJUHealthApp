import ActionType from './ActionTypes'
import {NavigationActions} from 'react-navigation';
import {HomeStackNavigator} from '../navigation/HomeNav';
import Routes from '../navigation/Routes'

const initialState = null;
let Reducer = (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case ActionType.GO:
            let route = action.data;
            nextState = HomeStackNavigator.router.getStateForAction(
                NavigationActions.navigate(route),
                state);
            break;
        case ActionType.BACK:
            nextState = HomeStackNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case ActionType.LOGIN:
            nextState = HomeStackNavigator.router.getStateForAction(
                NavigationActions.back(),
                state);
            break;

        case ActionType.LOGOUT:
            nextState = HomeStackNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: Routes.Home}),
                    ]
                }),
                state);
            break;

        default:
            nextState = HomeStackNavigator.router.getStateForAction(action,
                state);
            break;
    }
    return nextState || state;
};

let ActionCreator = {
    go(routeName) {
        return function (dispatch) {
            return dispatch({
                type: ActionType.GO,
                data: {routeName: routeName}});
        }
    },
    back() {
        return function (dispatch) {
            return dispatch({
                type: ActionType.BACK
            });
        }
    },
};

export default {ActionCreator, Reducer};

