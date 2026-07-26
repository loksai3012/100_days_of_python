const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/apiResponse');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Missing or invalid authorization header', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return sendError(res, 'Forbidden: admin only', 403);
  }
  return next();
}

module.exports = { authenticate, authorizeAdmin };
