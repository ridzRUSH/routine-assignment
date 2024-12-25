const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticateToken };
