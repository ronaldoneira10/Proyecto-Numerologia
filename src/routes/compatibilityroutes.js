const express = require("express");

const {
    check
} = require("../controllers/compatibilitycontroller");

const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/check", authMiddleware, check);

module.exports = router;
