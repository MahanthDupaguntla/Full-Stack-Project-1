import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AuctionTimer from '../components/AuctionTimer';

const socket = io('http://localhost:5000');

const AuctionPage = () => {
    const { user } = useAuth();
    const [auctions, setAuctions] = useState([]);
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const res = await axios.get('/api/auctions');
                setAuctions(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAuctions();

        socket.on('bidUpdate', (data) => {
            setAuctions(prev => prev.map(a =>
                a._id === data.auctionId ? { ...a, highestBid: data.amount, highestBidder: data.bidderName } : a
            ));
        });

        return () => socket.off('bidUpdate');
    }, []);

    const handlePlaceBid = (auctionId) => {
        if (!user) return alert('Please login to bid');
        if (!bidAmount) return;

        socket.emit('placeBid', {
            auctionId,
            bidder: user._id,
            bidderName: user.name,
            amount: Number(bidAmount)
        });
        setBidAmount('');
    };

    return (
        <div className="p-8 bg-black text-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-12 tracking-tighter italic">LIVE <span className="text-accent underline">AUCTIONS</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {auctions.map(auction => (
                        <div key={auction._id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 h-80 md:h-auto">
                                <img src={auction.artwork.image} alt={auction.artwork.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-3xl font-bold">{auction.artwork.title}</h2>
                                        <span className="bg-red-600 px-3 py-1 rounded text-xs animate-pulse">LIVE</span>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-zinc-400">
                                            <span>Highest Bid</span>
                                            <span className="text-white text-2xl font-bold">₹{auction.highestBid?.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-400">
                                            <span>Bidder</span>
                                            <span className="text-white">{auction.highestBidder || 'None'}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-400">
                                            <span>Time Remaining</span>
                                            <AuctionTimer endTime={auction.endTime} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Enter bid"
                                        className="flex-1 bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handlePlaceBid(auction._id)}
                                        className="btn-primary"
                                    >
                                        Place Bid
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionPage;
