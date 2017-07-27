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
    /*
     register: ({firstname, lastname, email, password, country, invitecode} = {}) => {
     let endPoint = DomainCommon.buildAPIUrl() + "profile";
     return new Promise((resolve, reject) => {
     return DomainCommon.fetchPost(endPoint, {
     FirstName: firstname,
     LastName: lastname,
     EmailAddress: email,
     Password: password,
     CountryIsoCode: country,
     InviteCode: invitecode
     }, resolve, reject);
     });
     },
     */
};

export default UserService;
