import ActionType from './ActionTypes'
import UserService from "../domain/User"
import DomainCommon from '../domain/Common'
import DeviceStore from '../DeviceStore'

const initialAuthState = {isLoggedIn: false};

let Reducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case ActionType.TOKEN_CHECKING:
            return {
                ...state,
                isFetching: true,
                isLoggedIn: false,
                checkingTokenError: null,
            };
        case ActionType.TOKEN_CHECKING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: action.data.isLoggedIn,
                checkingTokenError: null,
            };
        case ActionType.TOKEN_CHECKING_FAIL:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                checkingTokenError: action.error,
            };


        case ActionType.LOGGING:
            return {
                ...state,
                isFetching: true,
                isLoggedIn: false,
                loginError: null,
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                loginError: null,
            };
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                loginError: action.error,
            };


        case ActionType.REGISTERING:
            return {
                ...state,
                isFetching: true,
                isLoggedIn: false,
                registerError: null,
            };
        case ActionType.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                registerError: null,
            };
        case ActionType.REGISTER_FAIL:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                registerError: action.error,
            };

        case ActionType.LOGOUT:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

let ActionCreator = {
    isValidToken(token) {
        return function (dispatch) {
            dispatch({type: ActionType.TOKEN_CHECKING});
            return UserService.isValidToken(token).then(() => {
                return dispatch({type: ActionType.TOKEN_CHECKING_SUCCESS, data: {isLoggedIn: true}});
            }).catch(err => {
                DeviceStore.saveUserData(null);
                return dispatch({type: ActionType.TOKEN_CHECKING_FAIL, error: err})
            })
        }
    },
    login({email, password}) {
        return function (dispatch) {
            dispatch({type: ActionType.LOGGING});
            return UserService.login({email, password}).then(json => {
                return DeviceStore.saveUserData({token: json.token});
            }).then(() => {
                return dispatch({type: ActionType.LOGIN_SUCCESS});
            }).catch(err => {
                return dispatch({type: ActionType.LOGIN_FAIL, error: err})
            })
        }
    },
    register({email, password, uid}) {
        return function (dispatch) {
            dispatch({type: ActionType.REGISTERING});
            return UserService.register({email, password, uid}).then(json => {
                return DeviceStore.saveUserData({token: json.token});
            }).then(() => {
                return dispatch({type: ActionType.REGISTER_SUCCESS});
            }).catch(err => {
                return dispatch({type: ActionType.REGISTER_FAIL, error: err})
            })
        }
    },
    logout() {
        return function (dispatch) {
            DomainCommon.clearAPIToken();
            DeviceStore.saveUserData(null).then(()=>{
                return dispatch({type: ActionType.LOGOUT})
            })
        }
    },
};

export default {ActionCreator, Reducer};