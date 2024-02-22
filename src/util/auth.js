// random key, no meaning
const tokenKey = "xkqlms";

export function setToken(token) {
    localStorage.setItem(tokenKey, token);
}

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function removeToken() {
    localStorage.removeItem(tokenKey);
}
