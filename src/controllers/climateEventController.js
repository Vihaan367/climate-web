const ClimateEvent = require("../models/ClimateEvent");
const Community = require("../models/Community");
const User = require("../models/User");
const Payout = require("../models/Payout");

const simulateClimateEvent = async (req, res) => {
    try {
        if (req.user.role !== "community_admin") {
            return res.status(403).json({
                message: "Only community admins can simulate a climate event"
            });
        }

        const { type, rainfall, riverLevel, community } = req.body;

<<<<<<< HEAD
        const threshold = 250;
=======
        const communityData = await Community.findById(community);
        if (!communityData) {
            return res.status(404).json({
                message: "Community not found"
            });
        }

        const threshold = communityData.threshold;
>>>>>>> 144947a (connection)
        const triggered = rainfall >= threshold;

        const event = await ClimateEvent.create({
            type,
            rainfall,
            riverLevel,
            threshold,
            triggered,
            community
        });

        let payout = null;

        if (triggered) {
            const recipients = await User.find({ community, eligible: true });

            if (recipients.length > 0 && communityData.poolBalance > 0) {
                const payoutAmount = communityData.poolBalance;

                payout = await Payout.create({
                    community,
                    amount: payoutAmount,
                    reason: `Automatic payout: ${type} triggered (rainfall ${rainfall}mm crossed threshold ${threshold}mm)`,
                    recipients: recipients.map(user => user._id),
                    createdBy: req.user.id,
                    climateEvent: event._id,
                    status: "completed"
                });

                communityData.poolBalance = 0;
                await communityData.save();
            }
        }

        res.status(201).json({
            message: "Climate event created successfully",
            event,
            payout
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