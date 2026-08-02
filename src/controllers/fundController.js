const Fund = require("../models/Fund");
const Community = require("../models/Community");

const contribute = async (req, res) => {
    try {
        const { amount, community } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        const communityData = await Community.findById(community);
        if (!communityData) {
            return res.status(404).json({
                message: "Community not found"
            });
        }

        const fund = await Fund.create({
            amount,
            contributor: req.user.id,
            community
        });

        communityData.poolBalance += amount;
        await communityData.save();

        res.status(201).json({
            message: "Contribution successful",
            fund,
            newPoolBalance: communityData.poolBalance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    contribute
}