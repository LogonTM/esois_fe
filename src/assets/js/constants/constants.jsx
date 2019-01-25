export const back_end_host = 'http://localhost:8080/';
// export const back_end_host = 'http://raba.heisi.eu:8888/';
export const authentication_token = 'accessToken';

export const minimum_name_length = 4;
export const maximum_name_length = 40;

export const minimum_username_length = 3;
export const maximum_username_length = 15;

export const maximum_email_length = 40;

export const minimum_password_length = 6;
export const maximum_password_length = 20;

export const oauth2_redirect_uri = 'http://localhost:3000/oauth2/redirect'

export const google_auth_url = back_end_host + 'oauth2/authorize/google?redirect_uri=' + oauth2_redirect_uri;

export const okta_url = back_end_host + 'api/auth/samlLogin';

export const saml_url = back_end_host + 'saml/login';

export const logout_url = back_end_host + 'logout';