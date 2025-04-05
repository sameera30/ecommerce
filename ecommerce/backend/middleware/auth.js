const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        console.log('Decoded Token:', decoded); 
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateJWT;
