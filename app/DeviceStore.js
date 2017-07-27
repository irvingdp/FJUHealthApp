import { AsyncStorage } from 'react-native'

const USER_DATA_KEY = 'saved-user-data';

class DeviceStore {
    static loadUserData() {
        return AsyncStorage.getItem(USER_DATA_KEY)
            .then(data => data ? JSON.parse(data) : null)
            .catch(() => {
                console.log("DeviceStore: fail to load ");
                Promise.reject();
            });
    }
    static saveUserData(userData) {
        if (userData) {
            return AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
                .catch(() => {
                    console.log("DeviceStore: fail to save");
                    Promise.reject();
                });
        } else {
            return AsyncStorage.removeItem(USER_DATA_KEY)
                .catch(() => {
                    console.log("DeviceStore: fail to remove");
                    Promise.reject();
                });
        }
    }
}

export default DeviceStore;
