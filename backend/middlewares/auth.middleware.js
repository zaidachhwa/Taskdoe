const jwt = require("jsonwebtoken");

const secret = "$uperman1243";

async function checkAuth(req, res, next) {
  const token = req?.cookies["token"];

  if (!token) {
    return res.json({ message: "Please Login Again." });
  }

  try {
    const payload = jwt.verify(token, secret);

    if (payload) {
      req.user = payload;
    }
  } catch (error) {
    return res.json({
      message: "Invalid or expired token. Please login again.",
    });
  }

  return next();
}

module.exports = {
  checkAuth,
};
