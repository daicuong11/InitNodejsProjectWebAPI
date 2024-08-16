const jwt = require('jsonwebtoken');
require('dotenv').config();
const Response = require('../api/responses/Response'); // Đảm bảo đường dẫn đúng tới file chứa lớp Response

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json(new Response(401, 'error', 'No token provided'));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json(new Response(403, 'error', 'Invalid token'));
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
