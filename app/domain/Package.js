import DomainCommon from './Common';

const PackageService = {
    listPackages: () => {
        let endPoint = DomainCommon.buildAPIUrl() + "package";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetch(endPoint, resolve, reject, 'GET');

        })
    },
    getPackageDetails: () => {
        let endPoint = DomainCommon.buildAPIUrl() + "package/details";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetch(endPoint, resolve, reject, 'GET');

        })
    },
};

export default PackageService;
