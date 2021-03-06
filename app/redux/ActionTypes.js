const ActionType = {
    NAVIGATE: 'NAVIGATE',
    BACK: 'BACK',

    NAVIGATE_REPLACE: "NAVIGATE_REPLACE",
    NAVIGATE_RESET: "NAVIGATE_RESET",

    TOKEN_CHECKING: "TOKEN_CHECKING",
    TOKEN_CHECKING_SUCCESS: "TOKEN_CHECKING_SUCCESS",
    TOKEN_CHECKING_FAIL: "TOKEN_CHECKING_FAIL",

    DASHBOARD_FETCHING: "DASHBOARD_FETCHING",
    DASHBOARD_SUCCESS: "DASHBOARD_SUCCESS",
    DASHBOARD_FAIL: "DASHBOARD_FAIL",

    LOGGING: "LOGGING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",

    REGISTERING: "REGISTERING",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",

    PACKAGE_FETCHING: "PACKAGE_FETCHING",
    PACKAGE_SUCCESS: "PACKAGE_SUCCESS",
    PACKAGE_FAIL: "PACKAGE_FAIL",

    PACKAGE_DETAILS_FETCHING: "PACKAGE_DETAILS_FETCHING",
    PACKAGE_DETAILS_SUCCESS: "PACKAGE_DETAILS_SUCCESS",
    PACKAGE_DETAILS_FAIL: "PACKAGE_DETAILS_FAIL",

    RESERVATION_SET_PACKAGE: "RESERVATION_SET_PACKAGE",
    RESERVATION_SET_DATE: "RESERVATION_SET_DATE",
    RESERVATION_SET_FORM_DATA: "RESERVATION_SET_FORM_DATA",

    RESERVING: "RESERVING",
    RESERVE_SUCCESS: "RESERVE_SUCCESS",
    RESERVE_FAIL: "RESERVE_FAIL",

    UPDATING_PROFILE: "UPDATING_PROFILE",
    UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
    UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL",

    CREATING_DEVICE: "CREATING_DEVICE",
    CREATE_DEVICE_SUCCESS: "CREATE_DEVICE_SUCCESS",
    CREATE_DEVICE_FAIL: "CREATE_DEVICE_FAIL",

    UPDATING_DEVICE: "UPDATING_DEVICE",
    UPDATING_DEVICE_SUCCESS: "UPDATING_DEVICE_SUCCESS",
    UPDATING_DEVICE_FAIL: "UPDATING_DEVICE_FAIL",

    FORGET_PASSWORD: "FORGET_PASSWORD",
    FORGET_PASSWORD_SUCCESS: "FORGET_PASSWORD_SUCCESS",
    FORGET_PASSWORD_FAIL: "FORGET_PASSWORD_FAIL",

    LOGOUT: "LOGOUT",
};

export default ActionType;