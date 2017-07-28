const currentLanguage = "en-us";
//TODO: Ivan: make all const text into this file
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
        InstructionScreen: {
            title: "Instruction",
        },
        LocationScreen: {
            title: "Location",
        },
        SettingScreen: {
            title: "Settings",
            logout: _common.logout,
        },
        Solution: {
            title: "Solution",
        }
    }
}
const AppLabels = _appLabels[currentLanguage];
export default AppLabels;