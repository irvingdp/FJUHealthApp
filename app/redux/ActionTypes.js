const ActionType = {
    NAVIGATE: 'NAVIGATE',
    BACK: 'BACK',
    NAVIGATE_REPLACE: "NAVIGATE_REPLACE",

    TOKEN_CHECKING: "TOKEN_CHECKING",
    TOKEN_CHECKING_SUCCESS: "TOKEN_CHECKING_SUCCESS",
    TOKEN_CHECKING_FAIL: "TOKEN_CHECKING_FAIL",

    LOGGING: "LOGGING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",

    REGISTERING: "REGISTERING",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",

    PACKAGE_FETCHING: "PACKAGE_FETCHING",
    PACKAGE_SUCCESS: "PACKAGE_SUCCESS",
    PACKAGE_FAIL: "PACKAGE_FAIL",

    RESERVATION_SET_PACKAGE: "RESERVATION_SET_PACKAGE",
    RESERVATION_SET_DATE: "RESERVATION_SET_DATE",

    RESERVING: "RESERVING",
    RESERVE_SUCCESS: "RESERVE_SUCCESS",
    RESERVE_FAIL: "RESERVE_FAIL",

    LOGOUT: "LOGOUT",
};

export default ActionType;