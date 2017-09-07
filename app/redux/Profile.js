import ActionType from './ActionTypes'

import ProfileService from '../domain/Profile'

const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.profile
            };

        case ActionType.UPDATING_PROFILE:
            return {
                ...state,
                updateProfileError: null,
            };

        case ActionType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                data: action.data,
                updateProfileError: null,
            };

        case ActionType.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateProfileError: action.error,
            };

        case ActionType.LOGOUT:
            return initialState;

        default:
            return state;
    }
};
let ActionCreator = {
    updateProfile(formData) {
        return function (dispatch) {
            dispatch({type: ActionType.UPDATING_PROFILE});
            let postData = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                contactAddress: formData.contactAddress,
            }
            return ProfileService.updateProfile(postData).then((result) => {
                return dispatch({type: ActionType.UPDATE_PROFILE_SUCCESS, data: result});
            }).catch(err => {
                return dispatch({type: ActionType.UPDATE_PROFILE_FAIL, error: err})
            })
        }
    },
};
export default {Reducer, ActionCreator};