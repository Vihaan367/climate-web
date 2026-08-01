const mongoose = require("mongoose");

const climateEventSchema = new mongoose.Schema(
{
    type: {
        type: String,
        enum: ["Flood", "Cyclone", "Heavy Rain"],
        required: true
    },

    rainfall: {
        type: Number,
        required: true
    },

    riverLevel: {
        type: Number,
        required: true
    },

    threshold: {
        type: Number,
        default: 250
    },

    triggered: {
        type: Boolean,
        default: false
    },

    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("ClimateEvent", climateEventSchema);
