import DomainCommon from './Common';

const ProfileService = {
    updateProfile: (postData) => {
        let endPoint = DomainCommon.buildAPIUrl() + "profile";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPut(endPoint, postData, resolve, reject);
        })
    },
};

export default ProfileService;
