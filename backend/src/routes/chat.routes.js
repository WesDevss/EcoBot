const express = require('express');
const { sendChatResponse } = require('../controllers/chat.controller');

const router = express.Router();

router.post('/', sendChatResponse);

module.exports = router;
