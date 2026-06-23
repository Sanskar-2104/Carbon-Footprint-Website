import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'No authorization header provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Unauthorized', message: 'Format is Bearer <token>' });
    }

    const token = parts[1];
    if (!token || token === 'null') {
      return res.status(401).json({ error: 'Unauthorized', message: 'Token is missing' });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded; // Attach user data to request
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token has expired' });
      }
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized', message: error.message });
  }
};

export default authenticateToken;
