import express from 'express';

import validateRequestData from '../common/validator.js';
import makeRequest from './requestMaker.js';

const router = express.Router();

router.route('/send').post(async (req, res) => {
    console.log('body>', req.body);

    const validationError = validateRequestData(req.body);

    if (Object.keys(validationError).length) {
        console.log('send error');
        res.status(400).send(JSON.stringify(validationError));
        return;
    }

    const response = await makeRequest(req.body);

    res.send(JSON.stringify(response));
});

export default router;
