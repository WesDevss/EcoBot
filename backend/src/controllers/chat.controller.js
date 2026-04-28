const { processChatMessage } = require('../services/chatbot.service');

function sendChatResponse(req, res) {
  const { message } = req.body || {};
  const response = processChatMessage(message);

  res.json({
    message,
    response
  });
}

module.exports = {
  sendChatResponse
};
