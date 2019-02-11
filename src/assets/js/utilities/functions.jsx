import { back_end_host, authentication_token } from '../constants/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if (localStorage.getItem(authentication_token)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(authentication_token))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: back_end_host + "api/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return request({
        url: back_end_host + "api/auth/register",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}

export function updateUser(userUpdateData) {
    return request({
        url: back_end_host + "db/user/",
        method: 'POST',
        body: JSON.stringify(userUpdateData)
    });
}

export function removeCorpus(corpusID) {
    return request({
        url: back_end_host + 'db/corpus/' + corpusID,
        method: 'DELETE'
    })    
}

export function checkUsernameAvailability(username) {
    return request({
        url: back_end_host + "db/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: back_end_host + "db/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function checkUserEnabled(username) {
    return request({
        url: back_end_host + "db/user/checkEnabled?username=" + username,
        method: 'GET'
    })
}

export function getCurrentUser() {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: back_end_host + "db/user/me",
        method: 'GET'
    });
}

export function getCurrentUsers() {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: back_end_host + "db/user/",
        method: 'GET'
    });
}

export function getUserRoles() {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: back_end_host + "db/user/roles",
        method: 'GET'
    });
}

export function getSearchesMade(){
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set");
    }

    return request({
        url: back_end_host + "db/searchlog",
        method: 'GET'
    })

}

export function getUsersLog () {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set");
    }

    return request({
        url: back_end_host + "db/userlog",
        method: 'GET'
    })
}

export function getErrorsLog () {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set");
    }
    
    return request({
        url: back_end_host + "db/errorlog",
        method: 'GET'
    })
}
