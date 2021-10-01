const User = require("../models/User");
const argon2 = require("argon2");

const TokenUtils = require("../utils/token");

module.exports = {
  async register(req, res) {
    const { email, login, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.sendError(409, "This user is already registered");
      }
      await User.create({
        email,
        login,
        password: await argon2.hash(password),
      });
      res.sendMessage(201, "Successful registration");
    } catch (e) {
      res.res.sendError(500, "Server error", e);
    }
  },

  async login(req, res) {
    const { login, password } = req.body;
    // console.log(password)

    try {
      const user = await User.findOne({ login });
      if (!user) {
        return res.sendError(404, "No such user found");
      }

      if (!(await argon2.verify(user.password, password))) {
        return res.sendError(401, "Password is incorrect");
      }

      const accessToken = TokenUtils.generateAccessToken({ _id: user._id });
      const refreshToken = TokenUtils.generateRefreshToken({ _id: user._id });

      return res.json({ token: { accessToken, refreshToken } });
    } catch (e) {
      res.sendError(e);
    }
  },
  async updateSession(req, res) {
    const { oldAccessToken } = req.body;

    try {
      const decodedPayload = TokenUtils.decode(oldAccessToken);

      const accessToken = TokenUtils.generateAccessToken({
        _id: decodedPayload._id,
      });
      const refreshToken = TokenUtils.generateRefreshToken({
        _id: decodedPayload._id,
      });

      return res.json({ token: { accessToken, refreshToken } });
    } catch (e) {
      res.sendError(401, "Invalid token", e);
    }
  },
};
