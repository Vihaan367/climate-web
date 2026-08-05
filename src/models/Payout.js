const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
    {
community: {
type: mongoose.Schema.Types.ObjectId,
ref: "Community",
required: true
        },

amount: {
type: Number,
required: true
        },

reason: {
type: String,
required: true
        },

recipients: [
            {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
            }
        ],

status: {
type: String,
enum: ["pending", "completed"],
default: "pending"
        },

createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
        },

climateEvent: {
type: mongoose.Schema.Types.ObjectId,
ref: "ClimateEvent",
required: true
        }
},
    {
timestamps: true
}
);

module.exports = mongoose.model("Payout", payoutSchema);