import ActionType from './ActionTypes'
import {GENDER, PAYMENT_STATUS} from '../Enum'
import ReservationService from '../domain/Reservation'
const initialState = {};

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.RESERVATION_SET_PACKAGE:
            return {
                ...state,
                packageId: action.data.id,
                gender: action.data.gender,
            };
        case ActionType.RESERVATION_SET_DATE:
            return {
                ...state,
                ...action.data,
            };
        case ActionType.RESERVING:
            return {
                ...state,
                isFetching: true,
                reservationError: null,
            };

        case ActionType.RESERVE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                reservationError: null,
            };

        case ActionType.RESERVE_FAIL:
            return {
                ...state,
                isFetching: false,
                reservationError: action.error,
            };
        default:
            return state;
    }
};

let ActionCreator = {
    setPackage(p) {
        return function (dispatch) {
            return dispatch({type: ActionType.RESERVATION_SET_PACKAGE, data: p});
        }
    },
    setDate({reserveDate}) {
        return function (dispatch) {
            return dispatch({type: ActionType.RESERVATION_SET_DATE, data: {reserveDate}});
        }
    },
    reserve({name, birthday, phoneNumber, contactAddress}) {
        return function (dispatch, getState) {
            let state = getState();
            dispatch({type: ActionType.RESERVING});
            let postData = {
                name,
                birthday,
                phoneNumber,
                contactAddress,
                packageId: state.Reservation.packageId,
                reserveDate: state.Reservation.reserveDate.toISOString(),
            }
            return ReservationService.reserve(postData).then(() => {
                return dispatch({type: ActionType.RESERVE_SUCCESS});
            }).catch(err => {
                return dispatch({type: ActionType.RESERVE_FAIL, error: err})
            })
        }
    },
};

export default {ActionCreator, Reducer};