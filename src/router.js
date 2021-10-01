const express = require("express");
const router = express.Router();

const { checkAuth, validateRequest } = require("./utils/middlewares");

const Schemes = require("./schemes");

const Short = require("./controllers/short");
const Auth = require("./controllers/auth");

router.get("/short/", checkAuth, Short.get);

router.post("/auth/login", validateRequest(Schemes.Login), Auth.login);
router.post(
  "/auth/register",
  validateRequest(Schemes.Registration),
  Auth.register
);
router.post(
  "/auth/session/update",
  validateRequest(Schemes.AccessToken),
  Auth.updateSession
);
router.post("/short/", checkAuth, Short.create);
router.post("/short/update/:_id", checkAuth, Short.update);
router.delete("/short/:_id", checkAuth, Short.deleteById);

router.get("/:_id", Short.getById);

module.exports = router;
