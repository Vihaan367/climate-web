const express = require("express");

const router = express.Router();

const {
    createPayout,
    getAllPayouts,
    getPayoutById
} = require("../controllers/payoutController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPayout);

router.get("/", protect, getAllPayouts);

router.get("/:id", protect, getPayoutById);

module.exports = router;
