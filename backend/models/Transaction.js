const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
    invoiceId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
