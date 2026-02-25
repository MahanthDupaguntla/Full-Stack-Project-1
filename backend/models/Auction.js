const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
    minimumBid: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['upcoming', 'live', 'ended'], default: 'upcoming' },
    highestBid: { type: Number, default: 0 },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bidHistory: [{
        bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number },
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Auction', auctionSchema);
