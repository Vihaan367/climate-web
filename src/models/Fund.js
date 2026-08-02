const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
    },

    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Fund', fundSchema);
