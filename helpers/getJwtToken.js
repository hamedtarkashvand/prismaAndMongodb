const jwt = require('jsonwebtoken');

const getJetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1 DAY',
  });
};

module.exports = getJetToken