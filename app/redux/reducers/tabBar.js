import ActionType from '../actions'
import {NavigationActions} from 'react-navigation';
import {TabBarNavigator} from '../../navigation/TabBarNavigation';

const initialState = null;
function tabBar(state = initialState , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = TabBarNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}

export default tabBar;
