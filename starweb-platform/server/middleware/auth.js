const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

const roleCheck = (roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = { auth, roleCheck };
