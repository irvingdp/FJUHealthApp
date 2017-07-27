import ActionType from './ActionTypes'
import UserService from "../domain/User"
import DomainCommon from '../domain/Common'
import DeviceStore from '../DeviceStore'

const initialAuthState = {isLoggedIn: false};

let Reducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case ActionType.LOGGING:
            return {
                ...state,
                isFetching: true,
                isLoggedIn: false,
                error: null,
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                error: null,
            };
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                error: action.error,
            };
        case ActionType.LOGOUT:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                error: null,
            };
        default:
            return state;
    }
};

let ActionCreator = {
    login({email, password}) {
        return function (dispatch) {
            dispatch({type: ActionType.LOGGING});
            return UserService.login({email, password}).then(json => {
                return DeviceStore.saveUserData(json);
            }).then(() => {
                return dispatch({type: ActionType.LOGIN_SUCCESS});
            }).catch(err => {
                return dispatch({type: ActionType.LOGIN_FAIL, error: err})
            })
        }
    },
    logout() {
        return function (dispatch) {
            DomainCommon.clearAPIToken();
            dispatch({type: ActionType.LOGOUT});
            return DeviceStore.saveUserData(null);
        }
    },
};

export default {ActionCreator, Reducer};