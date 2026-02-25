import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-white">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000"
                        alt="Art Gallery"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
                        WELCOME TO <span className="text-accent italic">ARTFORGE</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-zinc-300 font-light max-w-2xl mx-auto">
                        A premium full-stack platform for artists, curators, and collectors to bridge the gap between imagination and reality.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/gallery" className="btn-primary py-4 px-10 text-lg">Explore Gallery</Link>
                        <Link to="/register" className="border border-white hover:bg-white hover:text-primary transition-all py-4 px-10 text-lg rounded-lg">Join as Artist</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8 bg-secondary dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
                        <div className="text-accent text-4xl mb-4">✦</div>
                        <h3 className="text-2xl font-bold mb-4">Real-time Auctions</h3>
                        <p className="text-zinc-500">Live bidding system with instant updates and transparent history.</p>
                    </div>
                    <div className="text-center p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
                        <div className="text-accent text-4xl mb-4">✧</div>
                        <h3 className="text-2xl font-bold mb-4">Virtual Tours</h3>
                        <p className="text-zinc-500">Explore curated exhibitions from the comfort of your home.</p>
                    </div>
                    <div className="text-center p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
                        <div className="text-accent text-4xl mb-4">⬥</div>
                        <h3 className="text-2xl font-bold mb-4">Secure Sales</h3>
                        <p className="text-zinc-500">Blockchain-ready transactions and verified artist certificates.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
