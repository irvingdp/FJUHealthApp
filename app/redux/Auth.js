import ActionType from './ActionTypes'

const initialAuthState = {isLoggedIn: false};

let Reducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return {...state, isLoggedIn: true};
        case ActionType.LOGOUT:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
};

let ActionCreator = {
    login() {
        return function (dispatch) {
            return dispatch({type: ActionType.LOGIN});
        }
    },
    logout() {
        return function (dispatch) {
            return dispatch({type: ActionType.LOGOUT});
        }
    },
};

export default {ActionCreator, Reducer};