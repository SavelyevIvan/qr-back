const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: process.env.ACCESS_TOKEN_LIVE,
    });
  },
  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: process.env.REFRESH_TOKEN_LIVE,
    });
  },
  verify(token) {
    return jwt.verify(token, process.env.SECRET_JWT);
  },
  decode(token) {
    return jwt.decode(token, process.env.SECRET_JWT);
  },
};
