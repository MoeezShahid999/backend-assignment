const userRoutes = require("express").Router();
const { userAuth } = require("../../userAuth/userAuth");
const userController = require("../../controller/user");
userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/", userAuth, async (req, res, next) => {
  try {
    res.json({ user: { id: req.id, email: req.email } });
  } catch (err) {
    next(err);
  }
});

module.exports = userRoutes;
