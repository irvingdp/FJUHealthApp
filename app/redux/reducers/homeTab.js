import ActionType from '../actions'

import {NavigationActions} from 'react-navigation';
import {HomeTabStackNavigator} from '../../navigation/HomeTabStackNavigation';

/*
// Start with two routes: The Home screen, with the Login screen on top.
const firstAction = HomeTabStackNavigator.router.getActionForPathAndParams('Home');
const firstNavState = HomeTabStackNavigator.router.getStateForAction(firstAction);
const secondAction = HomeTabStackNavigator.router.getActionForPathAndParams('Login');
const initialState = HomeTabStackNavigator.router.getStateForAction(
    secondAction,
    firstNavState
);
*/
/*
const initialState = HomeTabStackNavigator.router.getStateForAction(
    HomeTabStackNavigator.router.getActionForPathAndParams('Home')
);
*/
const initialState = null;

function homeTab(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case ActionType.LOGIN:
            nextState = HomeTabStackNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case ActionType.LOGOUT:
            nextState = HomeTabStackNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Login'}),
                state
            );
            break;
        default:
            nextState = HomeTabStackNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export default homeTab;

