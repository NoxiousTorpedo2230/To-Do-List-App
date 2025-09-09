const jwt = require('jsonwebtoken');
const { User } = require('../model/model');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }
    
    const token = authHeader.replace('Bearer ', '').trim();
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = { auth };