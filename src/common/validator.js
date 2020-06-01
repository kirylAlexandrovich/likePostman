function checkStringLength(str, length) {
    return str ? str.length < length : true;
}

function validateRequestData(data) {
    const validateResult = {};

    const {
        method, url, params, headers
    } = data;

    if (checkStringLength(method, 3)) {
        validateResult.method = 'Method is not valid';
    }

    if (checkStringLength(url, 6) || url.search(/http/ === -1)) {
        validateResult.url = 'Make sure you typed full URL';
    }

    if (url && url.search(/localhost/) !== -1) {
        validateResult.url = 'You can not send request to localhost';
    }

    const setParamError = (errText) => {
        if (!validateResult.paramsError) validateResult.paramsError = [];

        validateResult.paramsError.push(errText);
    };

    if (params) {
        params.forEach((param) => {
            if (param.key && !param.value) {
                setParamError(`Param value for key '${param.key}' is not exist`);
            }

            if (!param.key && param.value) {
                setParamError(`Param key for value '${param.value}' is not exist`);
            }
        });
    }

    if (headers && headers.length) {
        try {
            JSON.parse(headers);
        } catch (e) {
            validateResult.headers = `Headers parse error ${e.message}`;
        }
    }

    return validateResult;
}

export default validateRequestData;
