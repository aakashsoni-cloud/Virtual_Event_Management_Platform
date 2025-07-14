const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/usersControllers");

// POST /signup endpoint
router.post("/register", userRegister);

// POST /login endpoint
router.post("/login", userLogin);

module.exports = router;
