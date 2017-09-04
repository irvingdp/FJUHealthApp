import ActionType from './ActionTypes'

const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.report
            };

        case ActionType.LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default {Reducer};