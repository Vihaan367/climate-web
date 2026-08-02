const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
{
name: {
type: String,
required: true
    },

location: {
type: String,
required: true
    },

riskLevel: {
type: String,
enum: ["Low", "Medium", "High"],
default: "Low"
    },

totalMembers: {
type: Number,
default: 0
    },

threshold: {
type: Number,
default: 250
    },

poolBalance: {
type: Number,
default: 0
    }
},
{
timestamps: true
});

module.exports = mongoose.model("Community", communitySchema);