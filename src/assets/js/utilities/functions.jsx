import { back_end_host, authentication_token } from '../constants/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(authentication_token)) {
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
    console.log('Register function got called with path: ' + back_end_host + 'api/partner')
    return request({
        url: back_end_host + "api/partner",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}


export function getPartnersList() {
    return request({
        url: back_end_host + "api/partner",
        method: 'GET'
    });
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

export function getCurrentUser() {
    if(!localStorage.getItem(authentication_token)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: back_end_host + "db/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: back_end_host + "db/users/" + username,
        method: 'GET'
    });
}