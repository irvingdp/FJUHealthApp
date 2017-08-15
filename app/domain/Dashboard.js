import DomainCommon from './Common';

const DashboardService = {
    loadDashboard: () => {
        let endPoint = DomainCommon.buildAPIUrl() + "dashboard";
        return new Promise((resolve, reject) => {
            return DomainCommon.fetch(endPoint, resolve, reject, 'GET');

        })
    },
};

export default DashboardService;
