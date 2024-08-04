import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.header('Authorization').replace('Bearer ', '');
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    console.log('Verified user:', user);
    req.user = user;
    console.log('Req.user after setting:', req.user);
    next();
  });
};


// verifytoken.js
/*import jwt from 'jsonwebtoken';
import User from './models/user.js'; // Adjust the import according to your project structure

export const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id); // Fetch the user from the database
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token', error });
  }
};*/

