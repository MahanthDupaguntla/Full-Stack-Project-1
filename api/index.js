const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load env vars
require('dotenv').config({ path: require('path').resolve(__dirname, '../backend/.env') });

const authRoutes = require('../backend/routes/auth');
const artworkRoutes = require('../backend/routes/artworks');
const auctionRoutes = require('../backend/routes/auctions');
const exhibitionRoutes = require('../backend/routes/exhibitions');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (cached for serverless)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/exhibitions', exhibitionRoutes);

// Bid placement via REST (replaces Socket.io for serverless)
const Auction = require('../backend/models/Auction');
app.post('/api/auctions/:id/bid', async (req, res) => {
    try {
        const { bidder, bidderName, amount } = req.body;
        const auction = await Auction.findById(req.params.id);

        if (!auction || auction.status !== 'live') {
            return res.status(400).json({ error: 'Auction not available' });
        }
        if (amount <= auction.highestBid) {
            return res.status(400).json({ error: 'Bid must be higher than current highest bid' });
        }

        auction.highestBid = amount;
        auction.highestBidder = bidder;
        auction.bidHistory.push({ bidder, amount });
        await auction.save();

        res.json({ success: true, highestBid: amount, highestBidder: bidderName });
    } catch (error) {
        console.error('Bid Error:', error);
        res.status(500).json({ error: 'Failed to place bid' });
    }
});

module.exports = app;
