import ActionType from '../actions'

const initialAuthState = {isLoggedIn: false};

function auth(state = initialAuthState, action) {
    switch (action.type) {
        case ActionType.LOGIN:
            return {...state, isLoggedIn: true};
        case ActionType.LOGOUT:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}

export default auth;