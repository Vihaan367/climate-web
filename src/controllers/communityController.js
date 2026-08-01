const Community = require("../models/Community");

const createCommunity = async (req, res) => {
    try {
        if (req.user.role !== "community_admin") {
            return res.status(403).json({
                message: "Only community admins can create a community"
            });
        }

        const { name, location, riskLevel } = req.body;

        const existingCommunity = await Community.findOne({ name });

        if (existingCommunity) {
            return res.status(400).json({
                message: "Community already exists"
            });
        }

        const community = await Community.create({
            name,
            location,
            riskLevel
        });

        res.status(201).json({
            message: "Community Created Successfully",
            community
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createCommunity
};