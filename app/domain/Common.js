import config from '../../config'

let apiToken;

function getApiTokenHeader() {
    return apiToken ? {Authorization: apiToken} : {}
};
function check2XXStatus(status) {
    return status >= 200 && status < 300;
};
const domainCommon = {
    fetch: (url, resolve, reject, method, jsonBody) => {
        let options = method ? {method} : {};
        options = jsonBody ? Object.assign(options, {body: JSON.stringify(jsonBody)}) : options;

        // set apiTokenHeader if available
        options.headers = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, getApiTokenHeader());

        return fetch(url, options).then((response) => {
            if (check2XXStatus(response.status)) {
                resolve(response.json().catch(()=> {
                        return {}
                }));
            } else {
                if(response.status === 401) {
                    apiToken = undefined;
                }
                response.json().then(function (data) {
                    reject({...data, status: response.status});
                }).catch(function () {
                    reject({status: response.status}); //avoid response data can't serialization to json
                });
            }
        }).catch((err) => {
            reject(err);
        });
    },
    fetchPost: (url, jsonObj, resolve, reject) => {
        return domainCommon.fetch(url, resolve, reject, 'POST', jsonObj);
    },
    fetchPut: (url, jsonObj, resolve, reject) => {
        return domainCommon.fetch(url, resolve, reject, 'PUT', jsonObj);
    },
    fetchDelete: (url, resolve, reject, jsonObj) => {
        return domainCommon.fetch(url, resolve, reject, 'DELETE', jsonObj);
    },
    setAPIToken: (token) => {
        apiToken = token;
    },
    clearAPIToken: () => {
        apiToken = undefined;
    },
    buildAPIUrl: () => {
        return config.API_URL + "/";
    },
}

export default domainCommon;