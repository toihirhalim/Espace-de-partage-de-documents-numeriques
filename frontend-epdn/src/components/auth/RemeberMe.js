
export function getLocalToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}

export function setLocalToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

export function deleteLocalToken() {
    localStorage.removeItem('token')
}