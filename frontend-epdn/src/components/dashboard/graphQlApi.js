
export default async function graphQlApi(query) {
    return fetch('http://localhost:8000/', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            query: query
        })
    }).then(res => res.json()).then(json => json.data)
}