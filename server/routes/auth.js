const express = require("express");

const router = express.Router();

const {
    teamLogin,
    adminLogin
} = require("../controllers/authController");

router.post("/team-login", teamLogin);

router.post("/admin-login", adminLogin);

module.exports = router;