const express = require('express');
const Auction = require('../models/Auction');
const Artwork = require('../models/Artwork');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// Get active auctions
router.get('/', async (req, res) => {
    try {
        const auctions = await Auction.find({ status: 'live' }).populate('artwork');
        res.send(auctions);
    } catch (e) {
        res.status(500).send();
    }
});

// Schedule auction (Admin/Artist)
router.post('/', auth, authorize('admin', 'artist'), async (req, res) => {
    const auction = new Auction(req.body);
    try {
        await auction.save();
        // Update artwork to isAuction=true
        await Artwork.findByIdAndUpdate(req.body.artwork, { isAuction: true, auctionRef: auction._id });
        res.status(201).send(auction);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
