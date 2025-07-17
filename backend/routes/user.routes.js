const { Router } = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
} = require("../controllers/user.controller");

const router = Router();

router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;
