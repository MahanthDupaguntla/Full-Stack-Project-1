import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtworkGallery = () => {
    const [artworks, setArtworks] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Mock data for initial view
        const mockData = [
            { id: 1, title: 'Ethereal Dreams', artist: 'Jane Doe', price: 98000, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800', category: 'Abstract' },
            { id: 2, title: 'Golden Silence', artist: 'John Blue', price: 210000, image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800', category: 'Modern' },
            { id: 3, title: 'Urban Echo', artist: 'Alex Smith', price: 75000, image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800', category: 'Pop Art' },
        ];
        setArtworks(mockData);
    }, []);

    return (
        <div className="p-8 bg-secondary dark:bg-zinc-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight">ARTFORGE <span className="text-accent underline">COLLECTION</span></h1>
                    <div className="flex gap-4">
                        {['All', 'Abstract', 'Modern', 'Pop Art'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full transition-all ${filter === cat ? 'bg-accent text-white' : 'bg-white dark:bg-zinc-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {artworks.filter(a => filter === 'All' || a.category === filter).map(artwork => (
                        <div key={artwork.id} className="card overflow-hidden group">
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
                                    ₹{artwork.price.toLocaleString('en-IN')}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-1">{artwork.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-4">by {artwork.artist}</p>
                                <button className="w-full py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-accent hover:text-accent transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtworkGallery;
