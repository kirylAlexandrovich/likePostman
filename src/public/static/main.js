import validateRequestData from '/validator.js';

const paramKeyContainer = document.getElementById('paramInputContainerKey');
const paramValueContainer = document.getElementById('paramInputContainerValue');
const addParamButton = document.getElementById('addParam');
const removeParamButton = document.getElementById('removeParam');
const submitButton = document.getElementById('submitButton');
const resultContainer = document.getElementById('result');

const form = document.querySelector('form');

addParamButton.addEventListener('click', () => {
    const keyValueIndex = paramKeyContainer.childElementCount;
    paramKeyContainer.insertAdjacentHTML('beforeend', `
        <input type="text" name="paramKey_${keyValueIndex}">
    `);

    paramValueContainer.insertAdjacentHTML('beforeend', `
        <input type="text" name="paramValue_${keyValueIndex}">
    `);
});

removeParamButton.addEventListener('click', () => {
    if (paramKeyContainer.childElementCount === 1) return;

    paramKeyContainer.removeChild(paramKeyContainer.lastElementChild);
    paramValueContainer.removeChild((paramValueContainer.lastElementChild));
});

function convertRequestBody(formData) {
    const requestData = {};

    function pushParam(value, key, isKey) {
        if (!requestData.params) requestData.params = [];

        const index = key.match(/\d+/)[0];
        requestData.params[index] = requestData.params[index] || {};
        requestData.params[index][isKey ? 'key' : 'value'] = value;
    }

    formData.forEach((value, key) => {
        if (key.match(/[a-zA-Z]+/)[0] === 'paramKey' && value) {
            pushParam(value, key, true);
            return;
        }
        if (key.match(/[a-zA-Z]+/)[0] === 'paramValue' && value) {
            pushParam(value, key, false);
            return;
        }

        if (value) {
            requestData[key] = value;
        }
    });

    return requestData;
}

submitButton.addEventListener('click', async () => {
    const requestData = convertRequestBody(new FormData(form));

    const validationError = validateRequestData(requestData);

    if (Object.keys(validationError).length) {
        resultContainer.innerText = JSON.stringify(validationError, null, '\t'); // todo mark errors on fields
        return;
    }

    const res = await fetch('/send', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await res.json();

    if (res.status === 400) {
        resultContainer.innerText = JSON.stringify(json, null, '\t');
    } else {
        resultContainer.innerText = JSON.stringify(json, null, '\t');
    }
});
