require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
const Auction = require('./models/Auction');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Artwork.deleteMany({});
        await Auction.deleteMany({});

        // Create Admin
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@gallery.com',
            password: adminPassword,
            role: 'admin'
        });

        // Create Artist
        const artistPassword = await bcrypt.hash('artist123', 10);
        const artist = await User.create({
            name: 'Vincent van Gogh',
            email: 'vincent@art.com',
            password: artistPassword,
            role: 'artist'
        });

        // Create Artwork
        const artwork = await Artwork.create({
            title: 'Starry Night Replica',
            image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800',
            description: 'A beautiful replica of the famous Starry Night.',
            price: 5000,
            category: 'Impressionism',
            artist: artist._id,
            status: 'available',
            isAuction: true
        });

        // Create Auction
        const now = new Date();
        const auction = await Auction.create({
            artwork: artwork._id,
            minimumBid: 4000,
            startTime: now,
            endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
            status: 'live',
            highestBid: 4000
        });

        await Artwork.findByIdAndUpdate(artwork._id, { auctionRef: auction._id });

        console.log('Seed data created successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
