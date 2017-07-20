const currentLanguage = "zh-tw";

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
        HomeScreen: {
            title: "服務項目",
        },
        GuildScreen: {
            title: "健檢須知",
        },
        TrafficScreen: {
            title: "位置與交通",
        },
        ReportScreen: {
            title: "健檢報告",
        },
        SettingScreen: {
            title: "功能設定",
            logout: _common.logout,
        },
        Solution: {
            title: "健診方案",
        }
    },
    "en-us": {
        HomeScreen: {
            title: "Home",
        },
        GuildScreen: {
            title: "Guild",
        },
        TrafficScreen: {
            title: "Traffic",
        },
        ReportScreen: {
            title: "Report",
        },
        SettingScreen: {
            title: "Setting",
            logout: _common.logout,
        },
        Solution: {
            title: "Solution",
        }
    }
}
const AppLabels = _appLabels[currentLanguage];
export default AppLabels;