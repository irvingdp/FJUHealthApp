import ActionType from './ActionTypes'
import moment from 'moment';

const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DASHBOARD_SUCCESS:
            var isOutDate = moment().utc().diff(action.data.reserved.reserveDate, 'days') > 0;

            return {
                ...state,
                data: !isOutDate ? action.data.reserved : null,
            };

        case ActionType.LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default {Reducer};