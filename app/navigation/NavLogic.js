import Routes from '../navigation/Routes'

const NavLogic = {
    canBack: (nav) => {
        return (nav.routes[nav.index].index !== 0)
    },
    getNextNavigateRoute: (route, state) => {
        let nextRouteName = route && route.routeName;
        let nextRoute = {...route};
        switch (nextRouteName) {
            case Routes.BookStep1:
                if(!state.Auth.isLoggedIn) {
                    nextRoute = {
                        ...route,
                        routeName: Routes.Login,
                    }
                } else {
                    nextRoute = {
                        ...route,
                        routeName: Routes.BookStep1,
                    }
                }
                break;
            default:
                break;
        }
        return nextRoute;
    }
}

export default NavLogic