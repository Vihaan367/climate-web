const Payout = require("../models/Payout");
const User = require("../models/User");
const Community = require("../models/Community");

const createPayout = async (req, res) => {

    try {

        if (req.user.role !== "community_admin") {
            return res.status(403).json({
                message: "Only community admins can create payouts"
            });
        }

        const { community, amount, reason } = req.body;

        const recipients = await User.find({
            community,
            eligible: true
        });

        if (recipients.length === 0) {
            return res.status(400).json({
                message: "No eligible members found for this community"
            });
        }

        const communityData = await Community.findById(community);

        if (!communityData) {
            return res.status(404).json({
                message: "Community not found"
            });
        }

        if (communityData.poolBalance < amount) {
            return res.status(400).json({
                message: "Insufficient funds in community pool"
            });
        }

        const payout = await Payout.create({
            community,
            amount,
            reason,
            recipients: recipients.map(user => user._id),
            createdBy: req.user.id
        });

        communityData.poolBalance -= amount;
        await communityData.save();

        res.status(201).json({
            message: "Payout created successfully",
            payout,
            remainingPoolBalance: communityData.poolBalance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllPayouts = async (req, res) => {

    try {

        const payouts = await Payout.find()
            .populate("community")
            .populate("createdBy", "name email")
            .populate("recipients", "name email");

        res.status(200).json(payouts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getPayoutById = async (req, res) => {

    try {

        const payout = await Payout.findById(req.params.id)
            .populate("community")
            .populate("createdBy", "name email")
            .populate("recipients", "name email");

        if (!payout) {
            return res.status(404).json({
                message: "Payout not found"
            });
        }

        res.status(200).json(payout);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createPayout,
    getAllPayouts,
    getPayoutById
};
