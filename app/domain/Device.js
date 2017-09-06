import DomainCommon from './Common';

const DeviceService = {
    createDevice: (postData) => {
        let endPoint = DomainCommon.buildAPIUrl() + "fcmtoken";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, postData, resolve, reject);
        })
    },
    relateDeviceToUser: (postData) => {
        let endPoint = DomainCommon.buildAPIUrl() + "device";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPut(endPoint, postData, resolve, reject);
        })
    },
};

export default DeviceService;
