import ActionType from './ActionTypes'
import PackageService from "../domain/Package"

const initialState = {data: null};

let Reducer = (state = initialState, action) => {
    let viewData = {};
    switch (action.type) {
        case ActionType.PACKAGE_FETCHING:
            return {
                ...state,
                isFetching: true,
                fetchingPackageError: null,
            };
        case ActionType.PACKAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data,
                fetchingPackageError: null,
                viewData,
            };
        case ActionType.PACKAGE_FETCHING:
            return {
                ...state,
                isFetching: false,
                fetchingPackageError: action.error,
            };
        default:
            return state;
    }
};

let ActionCreator = {
    listPackages() {
        return function (dispatch) {
            dispatch({type: ActionType.PACKAGE_FETCHING});
            return PackageService.listPackages().then((json) => {
                return dispatch({type: ActionType.PACKAGE_SUCCESS, data: json});
            }).catch(err => {
                return dispatch({type: ActionType.PACKAGE_FAIL, error: err})
            })
        }
    },
};

export default {ActionCreator, Reducer};