import ActionType from './ActionTypes'
const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.reservation,
            };

        case ActionType.LOGOUT:
            return {
                ...state,
                data: null,
            };

        default:
            return state;
    }
};
export default {Reducer};