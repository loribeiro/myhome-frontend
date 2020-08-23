const AUTH_TOKEN = 'auth-token';
const AUTH_DATE = 'auth-date';

/* export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN); */

export function setToken(tokens){
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(tokens));
    setDateToken();

}

export function getTokens() {
    var last_login = new Date(getDateToken())
    var data_agora = new Date()
    var diff = Math.abs(data_agora - last_login)
    var minutes = Math.floor((diff/1000)/60);
    if(minutes > 600){
        localStorage.removeItem(AUTH_DATE);
        localStorage.removeItem(AUTH_TOKEN);
    }

    return JSON.parse(localStorage.getItem(AUTH_TOKEN));
}
  
export function deleteTokens() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_DATE);
}

function setDateToken() {
    var date = new Date();
    localStorage.setItem(AUTH_DATE, JSON.stringify(date));
}

function getDateToken() {
    return JSON.parse(localStorage.getItem(AUTH_DATE));
}