const jwt = require('jsonwebtoken');

const generateToken = (user, role) => {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: role
    },
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  );
};

module.exports = { generateToken };