import fetch from 'node-fetch';

function getHeaders(headers) {
    const headersObject = {};

    for (let [key, value] of headers) {
        headersObject[key] = value;
    }

    return headersObject;
}

async function getBody(res, contentType) {
    let result;

    try {
        if (contentType.search(/application\/json/) !== -1) {
            result = await res.json();
        }

        if (contentType.search(/text/) !== -1) {
            result = await res.text();
        }
    } catch (e) {
        console.log(e);
    }

    return result || `Content type ${contentType} is not support yet!`;
}

async function makeRequest(reqData) {
    let options = {};

    if (reqData.headers) {
        options = {
            ...JSON.parse(reqData.headers)
        };
    }
    options.method = reqData.method;

    if (reqData.body) {
        options.body = reqData.body;
    }

    let url = reqData.url;

    if (reqData.params) {
        url += '?';
        reqData.params.forEach((param) => {
            url += `${param.key}=${param.value}&`;
        });
    }

    console.log(url, options);

    const res = await fetch(url, options);

    const result = {
        headers: getHeaders(res.headers)
    };

    result.body = await getBody(res, res.headers.get('content-type'));

    return result;
}

export default makeRequest;
