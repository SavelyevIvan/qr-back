const TokenUtils = require("./token");
const Schemes = require("../schemes");

const middlewares = {
  modifyResponse(req, res, next) {
    res.sendMessage = (status, message) => {
      res.status(status).json({ message });
    };
    res.sendError = (status, message, error = null) => {
      res.status(status).json({ error: message });
      console.log(error);
    };
    next();
  },

  validateRequest(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);

      if (error) {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");

        return res.sendError(400, message, error);
      }
      next();
    };
  },

  checkAuth(req, res, next) {
    const token = req.get("Authorization");
    middlewares.validateRequest(Schemes.AccessToken, token);
    try {
      const decodedPayload = TokenUtils.verify(token);
      req.user = {};
      req.user._id = decodedPayload._id;

      next();
    } catch (e) {
      res.sendError(401, "Invalid token", e);
    }
  },
};

module.exports = middlewares;
