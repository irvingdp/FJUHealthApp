import DomainCommon from './Common';

const ReservationService = {
    reserve: (postData) => {
        let endPoint = DomainCommon.buildAPIUrl() + "reservation";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetchPost(endPoint, postData, resolve, reject);
        })
    },
};

export default ReservationService;
