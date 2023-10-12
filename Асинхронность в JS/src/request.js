function baseRequest(url) {
    return async function () {
        const value = await fetch(url)
        if (value.ok) {
            return value.json()
        } else {
            throw Error("error in request")
        }
    }
}

const sucessfullRequest = baseRequest('http://httpbin.org/get?param1=test')
const badRequest = baseRequest('http://httpbin.org/status/404')
const randomRequest = async () => Math.random() >= 0.5 ? await sucessfullRequest() : await badRequest()


