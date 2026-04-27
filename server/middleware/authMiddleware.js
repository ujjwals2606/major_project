const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // ================= JWT AUTH (EXISTING) =================
    const token = req.cookies?.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
          return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = user;
        console.log("JWT Auth ✅");
        return next();

      } catch (err) {
        console.log("JWT Invalid ❌");
        // continue to check YouTube token
      }
    }

    // ================= YOUTUBE TOKEN AUTH =================
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const ytToken = authHeader.split(" ")[1];

      if (ytToken) {
        req.youtubeToken = ytToken;
        console.log("YouTube Token Auth ✅");
        return next();
      }
    }

    // ================= NO AUTH =================
    console.log("No valid auth ❌");

    return res.status(401).json({
      message: 'No token, authorization denied'
    });

  } catch (error) {
    console.error('Auth middleware error 🔥:', error);

    res.status(401).json({
      message: 'Token is not valid',
      error: error.message
    });
  }
};

module.exports = authMiddleware;