const express = require("express");
const router = express.Router();

const {
    simulateClimateEvent,
    getClimateEvents
} = require("../controllers/climateEventController");

const { protect } = require("../middleware/authMiddleware");

router.post("/simulate", protect, simulateClimateEvent);

router.get("/", protect, getClimateEvents);

module.exports = router;
