const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    curator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
    theme: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    commentary: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);
