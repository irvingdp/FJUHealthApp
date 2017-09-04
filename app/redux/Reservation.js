import ActionType from './ActionTypes'
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
        case ActionType.RESERVATION_SET_FORM_DATA:
            return {
                ...state,
                formData: {...action.data},
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
        case ActionType.LOGOUT:
            return initialState;

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
    setFormData(formData) {
        return function (dispatch) {
            return dispatch({type: ActionType.RESERVATION_SET_FORM_DATA, data: formData});
        }
    },
    reserve(formData) {
        return function (dispatch, getState) {
            dispatch({type: ActionType.RESERVATION_SET_FORM_DATA, data: formData});
            dispatch({type: ActionType.RESERVING});
            let state = getState();
            let postData = {
                name: state.Reservation.formData.name,
                birthday: state.Reservation.formData.birthday,
                phoneNumber: state.Reservation.formData.phoneNumber,
                contactAddress: state.Reservation.formData.contactAddress,
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