import ActionType from './ActionTypes'

const initialState = {
    isShowGlobalSpinner: false,
};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.TOKEN_CHECKING:
        case ActionType.LOGGING:
        case ActionType.REGISTERING:
        case ActionType.UPDATING_PROFILE:
        case ActionType.RESERVING:
        case ActionType.PACKAGE_DETAILS_FETCHING:
            return {
                ...state,
                isShowGlobalSpinner: true,
            };

        case ActionType.TOKEN_CHECKING_SUCCESS:
        case ActionType.LOGIN_SUCCESS:
        case ActionType.REGISTER_SUCCESS:
        case ActionType.UPDATE_PROFILE_SUCCESS:
        case ActionType.RESERVE_SUCCESS:
        case ActionType.PACKAGE_DETAILS_SUCCESS:
            return {
                ...state,
                isShowGlobalSpinner: false,
            };

        case ActionType.TOKEN_CHECKING_FAIL:
        case ActionType.LOGIN_FAIL:
        case ActionType.REGISTER_FAIL:
        case ActionType.UPDATE_PROFILE_FAIL:
        case ActionType.RESERVE_FAIL:
        case ActionType.PACKAGE_DETAILS_FAIL:
            return {
                ...state,
                isShowGlobalSpinner: false,
            };

        default:
            return state;
    }
};

export default {Reducer};