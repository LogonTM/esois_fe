import { back_end_host } from '../constants/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    // if(localStorage.getItem(authentication_token)) {
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem(authentication_token))
    // }

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
