const jwt = require('jsonwebtoken');

function decodeUser (req, res, next) {
    // Get the token from the request headers
    const token = req.headers['token'];
  
    // Verify the token and extract the userId
    jwt.verify(token, process.env.JWTSecret, (err, decoded) => {
      if (err) {
        // Handle invalid token
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = { _id: decoded.data };
      next();
    });
  };

module.exports = decodeUser;