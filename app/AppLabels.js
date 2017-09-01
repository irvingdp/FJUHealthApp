const currentLanguage = "en-us";
//TODO: complete localization , default language is tw
const Common = {
    "zh-tw": {
        login: "登入",
        logout: "登出",
    },
    "en-us": {
        login: "login",
        logout: "logout",
    }
}
const _common = Common[currentLanguage];
const _appLabels = {
    "zh-tw": {

    },
    "en-us": {
        DashboardScreen: {
            title: "Dashboard",
        },
        PackageScreen: {
            title: "Package",
        },
        LocationScreen: {
            title: "Location",
        },
        ProfileScreen: {
            title: "Profile",
            logout: _common.logout,
        },
        Solution: {
            title: "Solution",
        }
    }
}
const AppLabels = _appLabels[currentLanguage];
export default AppLabels;