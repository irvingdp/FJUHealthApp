import ActionType from './ActionTypes'
const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...action.data.reservation
            };
        case ActionType.LOGOUT:
            return {};
        default:
            return state;
    }
};
export default {Reducer};