const ClimateEvent = require("../models/ClimateEvent");

const simulateClimateEvent = async (req, res) => {
    try {

        const {
            type,
            rainfall,
            riverLevel,
            community
        } = req.body;

        // Check if the rainfall crosses the threshold
        const threshold = 250;
        const triggered = rainfall >= threshold;

        const event = await ClimateEvent.create({
            type,
            rainfall,
            riverLevel,
            threshold,
            triggered,
            community
        });

        res.status(201).json({
            message: "Climate event created successfully",
            event
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getClimateEvents = async (req, res) => {

    try {

        const events = await ClimateEvent
            .find()
            .populate("community");

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    simulateClimateEvent,
    getClimateEvents
};
