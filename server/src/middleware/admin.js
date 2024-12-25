const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authorizeAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { authorizeAdmin };
