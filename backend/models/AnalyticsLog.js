const mongoose = require('mongoose');

const analyticsLogSchema = new mongoose.Schema({
    eventType: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('AnalyticsLog', analyticsLogSchema);
