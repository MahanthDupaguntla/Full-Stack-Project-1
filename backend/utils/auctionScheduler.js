const Auction = require('../models/Auction');
const Artwork = require('../models/Artwork');

const startAuctionScheduler = (io) => {
    setInterval(async () => {
        try {
            const now = new Date();

            // 1. Move Upcoming to Live
            const toLive = await Auction.find({
                status: 'upcoming',
                startTime: { $lte: now }
            });

            for (const auction of toLive) {
                auction.status = 'live';
                await auction.save();
                io.emit('auctionStarted', { auctionId: auction._id });
                console.log(`Auction ${auction._id} is now LIVE`);
            }

            // 2. Move Live to Ended
            const toEnded = await Auction.find({
                status: 'live',
                endTime: { $lte: now }
            });

            for (const auction of toEnded) {
                auction.status = 'ended';
                await auction.save();

                // Mark artwork as sold if there were bids
                if (auction.highestBidder) {
                    await Artwork.findByIdAndUpdate(auction.artwork, { status: 'sold' });
                }

                io.emit('auctionEnded', {
                    auctionId: auction._id,
                    winner: auction.highestBidder,
                    amount: auction.highestBid
                });
                console.log(`Auction ${auction._id} has ENDED`);
            }
        } catch (error) {
            console.error('Auction Scheduler Error:', error);
        }
    }, 10000); // Check every 10 seconds
};

module.exports = startAuctionScheduler;
