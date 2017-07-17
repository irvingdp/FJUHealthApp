import ActionType from '../actions'

import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../../navigators/AppNavigator';
import Routes from '../../navigators/Routes';

// Start with two routes: The Home screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const firstNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
    secondAction,
    firstNavState
);
function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case ActionType.LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case ActionType.LOGOUT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: Routes.getRouteName(Routes.Screens.Login)}),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export default nav;