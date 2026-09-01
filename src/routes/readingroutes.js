const express = require("express");

const {
    generate,
    history
} = require("../controllers/readingcontroller");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generate);
router.get("/history", authMiddleware, history);

module.exports = router;