import ActionType from './ActionTypes'
import DashboardService from "../domain/Dashboard"
const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_FETCHING:
            return {
                ...state,
                isFetching: true,
                error: null,
            };

        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: null,
            };
        case ActionType.DASHBOARD_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
};

let ActionCreator = {
    loadDashboard() {
        return function (dispatch) {
            dispatch({type: ActionType.DASHBOARD_FETCHING});
            return DashboardService.loadDashboard().then((json) => {
                return dispatch({type: ActionType.DASHBOARD_SUCCESS, data: json});
            }).catch(err => {
                return dispatch({type: ActionType.DASHBOARD_FAIL, error: err})
            })
        }
    },
};

export default {ActionCreator, Reducer};