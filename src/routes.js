import express from 'express';

import senderRouter from './requester/requester.router.js';

const router = express.Router();

router.use('/', senderRouter);

export default router;
