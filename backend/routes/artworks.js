const express = require('express');
const Artwork = require('../models/Artwork');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// Get all artworks
router.get('/', async (req, res) => {
    try {
        const artworks = await Artwork.find({ status: 'available' }).populate('artist', 'name');
        res.send(artworks);
    } catch (e) {
        res.status(500).send();
    }
});

// Create artwork (Artists only)
router.post('/', auth, authorize('artist', 'admin'), async (req, res) => {
    const artwork = new Artwork({
        ...req.body,
        artist: req.user._id
    });
    try {
        await artwork.save();
        res.status(201).send(artwork);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
