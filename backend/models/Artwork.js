const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    culturalHistory: { type: String },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    isAuction: { type: Boolean, default: false },
    auctionRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artwork', artworkSchema);
