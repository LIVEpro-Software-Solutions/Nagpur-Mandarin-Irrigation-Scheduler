const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to verify JWT and extract user
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ success: false, msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Attach user to request
    req.user = decoded.user;

    // Continue
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ success: false, msg: 'Token is not valid' });
  }
};
