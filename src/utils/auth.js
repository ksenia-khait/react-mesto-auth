export const baseUrl = 'https://auth.nomoreparties.co'

export function getResponseData(res) {
    if (res.ok) {
        return res.json();
    } else {
        return res.json()
            .then(data => {
                throw new Error(data.error || data.message);
            });
    }
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => getResponseData(res))
}

export function authorize(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => getResponseData(res))
}

export function getContent(token) {
    return fetch(`${baseUrl}/signin`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res) => getResponseData(res))
}





