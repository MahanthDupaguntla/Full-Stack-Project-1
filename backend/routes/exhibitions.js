const express = require('express');
const Exhibition = require('../models/Exhibition');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// Get all exhibitions
router.get('/', async (req, res) => {
    try {
        const exhibitions = await Exhibition.find().populate('artworks');
        res.send(exhibitions);
    } catch (e) {
        res.status(500).send();
    }
});

// Create exhibition (Curators only)
router.post('/', auth, authorize('curator', 'admin'), async (req, res) => {
    const exhibition = new Exhibition({
        ...req.body,
        curator: req.user._id
    });
    try {
        await exhibition.save();
        res.status(201).send(exhibition);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
