import ActionType from './ActionTypes'
import DeviceService from "../domain/Device"

const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CREATING_DEVICE:
            return {
                ...state,
                createDeviceError: null,
            };

        case ActionType.CREATE_DEVICE_SUCCESS:
            return {
                ...state,
                createDeviceError: null,
                data: action.data,
            };

        case ActionType.CREATE_DEVICE_FAIL:
            return {
                ...state,
                createDeviceError: action.error,
            };

        default:
            return state;
    }
};

let ActionCreator = {
    relateDeviceToUser() {
        return function (dispatch, getState) {
            dispatch({type: ActionType.UPDATING_DEVICE});
            return DeviceService.relateDeviceToUser({fcm_token: getState().Device.data.fcm_token}).then(() => {
                return dispatch({type: ActionType.UPDATING_DEVICE_SUCCESS});
            }).catch(err => {
                return dispatch({type: ActionType.UPDATING_DEVICE_FAIL, error: err})
            })
        }
    },
    createDevice(fcm_token) {
        return function (dispatch) {
            dispatch({type: ActionType.CREATING_DEVICE});
            return DeviceService.createDevice({fcm_token}).then(() => {
                return dispatch({type: ActionType.CREATE_DEVICE_SUCCESS, data: {fcm_token}});
            }).catch(err => {
                return dispatch({type: ActionType.CREATE_DEVICE_FAIL, error: err})
            })
        }
    },
};

export default {ActionCreator, Reducer};