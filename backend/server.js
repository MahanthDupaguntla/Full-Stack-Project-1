require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const artworkRoutes = require('./routes/artworks');
const auctionRoutes = require('./routes/auctions');
const exhibitionRoutes = require('./routes/exhibitions');
const startAuctionScheduler = require('./utils/auctionScheduler');
const Auction = require('./models/Auction');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/exhibitions', exhibitionRoutes);

// Socket.io for Real-time Auction
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinAuction', (auctionId) => {
        socket.join(auctionId);
        console.log(`User joined auction: ${auctionId}`);
    });

    socket.on('placeBid', async (data) => {
        try {
            const { auctionId, bidder, amount } = data;
            const auction = await Auction.findById(auctionId);

            if (auction && auction.status === 'live' && amount > auction.highestBid) {
                auction.highestBid = amount;
                auction.highestBidder = bidder;
                auction.bidHistory.push({ bidder, amount });
                await auction.save();

                io.to(auctionId).emit('bidUpdate', {
                    auctionId,
                    amount,
                    bidderName: data.bidderName
                });
            }
        } catch (error) {
            console.error('Bid Error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        startAuctionScheduler(io);
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
