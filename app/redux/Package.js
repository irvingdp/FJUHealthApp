import ActionType from './ActionTypes'
import PackageService from '../domain/Package'

const initialState = {
    data: null,
    details: null
};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.package
            }
        case ActionType.PACKAGE_DETAILS_SUCCESS:
            return {
                ...state,
                details: action.data
            };
        case ActionType.PACKAGE_DETAILS_FAIL:
            return {
                ...state,
                fetchingPackageDetailError: action.error,
            };
        default:
            return state;
    }
};
let ActionCreator = {
    getPackageDetails() {
        return function (dispatch) {
            dispatch({type: ActionType.PACKAGE_FETCHING});
            return PackageService.getPackageDetails().then((json) => {
                return dispatch({type: ActionType.PACKAGE_DETAILS_SUCCESS, data: json});
            }).catch(err => {
                return dispatch({type: ActionType.PACKAGE_DETAILS_FAIL, error: err})
            })
        }
    },
};
export default {ActionCreator, Reducer};