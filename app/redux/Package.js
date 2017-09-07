import ActionType from './ActionTypes'

const initialState = {data: null};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.package
            };
        default:
            return state;
    }
};

export default {Reducer};