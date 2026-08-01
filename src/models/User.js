const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["member", "community_admin"],
        default: "member"
    },

    community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
    },

    contribution: {
        type: Number,
        default: 100
    },

    eligible: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);