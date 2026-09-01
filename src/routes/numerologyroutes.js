const express = require("express");

const {
    calculate,
    profile
} = require("../controllers/numerologycontroller");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/calculate", authMiddleware, calculate);
router.get("/profile", authMiddleware, profile);

module.exports = router;