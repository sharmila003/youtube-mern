import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (token == null) return res.sendStatus(401); // If no token is found, respond with Unauthorized

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, respond with Forbidden
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
