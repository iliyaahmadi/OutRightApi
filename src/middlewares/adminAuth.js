const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;
    req.userRole = user.role;
    if (user.role == 3) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
};
