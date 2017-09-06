import ActionType from './ActionTypes'
import moment from 'moment';

const initialState = {};

let isOutDate = (reserved) => {
    return moment().utc().diff(reserved.reserveDate, 'days') > 0;
};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data.reserved && !isOutDate(action.data.reserved) ? action.data.reserved : null,
            };

        case ActionType.LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default {Reducer};