function processChatMessage(message = '') {
  const normalizedMessage = String(message).toLowerCase().trim();
  const responses = {
    consumo: 'Seu consumo atual está 16.7% menor que o período anterior.',
    sugestões: 'Aqui estão algumas sugestões para reduzir seu impacto ambiental...',
    sugestoes: 'Aqui estão algumas sugestões para reduzir seu impacto ambiental...',
    default: 'Como posso ajudar com sua gestão sustentável hoje?'
  };

  return responses[normalizedMessage] || responses.default;
}

module.exports = {
  processChatMessage
};
