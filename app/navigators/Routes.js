import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

let _screens = {
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
};

const Routes = {
    Screens: _screens,
    getRouteName: (screen) => {
        for(var key in _screens) {
            if(_screens[key] === screen)
                return key;
        }
    },
}
export default Routes