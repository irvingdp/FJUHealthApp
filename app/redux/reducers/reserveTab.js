import ActionType from '../actions'
import {NavigationActions} from 'react-navigation';
import {ReserveTabStackNavigator} from '../../navigation/ReserveTabNavigation';

const initialState = null;
function reserveTab(state = initialState , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = ReserveTabStackNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}

export default reserveTab;
