
export async function loginUserApi(credentials) {
    return fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(json => json.data)
}

export async function signupUserApi(credentials) {
    return fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(json => json.data)
}