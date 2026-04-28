const suggestions = require('../data/suggestions.data');

function getSuggestions(req, res) {
  res.json(suggestions);
}

module.exports = {
  getSuggestions
};
