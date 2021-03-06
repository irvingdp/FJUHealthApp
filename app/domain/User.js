import DomainCommon from './Common';

const UserService = {
    login: ({email, password}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "login";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {email, password}, resolve, reject);
        }).then((data) => {
            DomainCommon.setAPIToken(data.token);
            return data;
        });
    },
    register: ({email, password, uid} = {}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "register";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {email, password, uid}, resolve, reject);
        }).then((data) => {
            DomainCommon.setAPIToken(data.token);
            return data;
        });
    },
    isValidToken: (token) => {
        DomainCommon.setAPIToken(token);
        let endPoint = DomainCommon.buildAPIUrl() + "isValidToken";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {token}, resolve, reject);
        })
    },
    forgetPassword: ({email}) => {
        let endPoint = DomainCommon.buildAPIUrl() + "forgetPassword/generate";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, {email}, resolve, reject);
        })
    },
};

export default UserService;
