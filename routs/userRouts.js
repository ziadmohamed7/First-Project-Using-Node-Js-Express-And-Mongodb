const express = require("express");
const {registerUser,loginUser,currentUser} = require("../controllers/userController");
const validateToken = require("../midellware/validateUserToken");


const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.get("/current",validateToken,currentUser);


module.exports = router;