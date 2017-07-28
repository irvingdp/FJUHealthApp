import DomainCommon from './Common';

const UserService = {
    login: ({email, password}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "login";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {email, password}, resolve, reject);
        }).then((data) => {
            DomainCommon.setAPIToken({token: data.token});
            return data;
        });
    },
    register: ({email, password} = {}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "register";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {email, password}, resolve, reject);
        }).then((data) => {
            DomainCommon.setAPIToken({token: data.token});
            return data;
        });
    },
    isValidToken: ({token} = {}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "isValidToken";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {token}, resolve, reject);
        }).then((data) => {
            data.valid && DomainCommon.setAPIToken({token});
            return data;
        });
    },
};

export default UserService;
