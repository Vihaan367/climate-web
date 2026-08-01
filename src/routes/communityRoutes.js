const express = require("express");
const router = express.Router();
const { createCommunity } = require("../controllers/communityController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createCommunity);

module.exports = router;