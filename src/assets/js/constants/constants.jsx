export const back_end_host = 'http://localhost:8080/';
export const oauth2_redirect_uri = 'http://localhost:3000/oauth2/redirect'

//export const back_end_host = 'http://raba.heisi.eu:8888/';
//export const oauth2_redirect_uri = 'http://raba.heisi.eu:8080/oauth2/redirect'

export const authentication_token = 'accessToken';

export const minimum_name_length = 4;
export const maximum_name_length = 100;

export const minimum_username_length = 3;
export const maximum_username_length = 100;

export const maximum_email_length = 40;

export const minimum_password_length = 6;
export const maximum_password_length = 100;

export const github_auth_url = back_end_host + 'oauth2/authorize/github?redirect_uri=' + oauth2_redirect_uri;

export const saml_url = back_end_host + 'saml/login';

export const logout_url = back_end_host + 'logout';