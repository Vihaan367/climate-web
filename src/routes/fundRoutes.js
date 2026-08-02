const express = require("express");
const router = express.Router();
const { contribute } = require("../controllers/fundController");
const { protect } = require("../middleware/authMiddleware");

router.post("/contribute", protect, contribute);

module.exports = router;