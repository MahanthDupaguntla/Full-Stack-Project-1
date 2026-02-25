import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const { user } = useAuth();

    const mockAnalytics = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ];

    const renderAdminWidgets = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Total Revenue</h3>
                <p className="text-3xl font-bold">₹1,07,07,705</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Artworks Sold</h3>
                <p className="text-3xl font-bold">1,240</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Active Users</h3>
                <p className="text-3xl font-bold">856</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Auction Success</h3>
                <p className="text-3xl font-bold">94%</p>
            </div>
        </div>
    );

    const renderArtistWidgets = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Upload New Artwork</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Share your latest masterpiece with the world.</p>
                <button className="btn-primary w-full">Upload Now</button>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Total Views</h3>
                <p className="text-3xl font-bold">12,500</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-zinc-500 text-sm mb-2 uppercase">Your Sales</h3>
                <p className="text-3xl font-bold">₹3,50,700</p>
            </div>
        </div>
    );

    return (
        <div className="p-8 bg-secondary dark:bg-zinc-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold">Hello, {user?.name}</h1>
                    <p className="text-zinc-500 uppercase text-sm tracking-widest">{user?.role} Dashboard</p>
                </header>

                {user?.role === 'admin' && renderAdminWidgets()}
                {user?.role === 'artist' && renderArtistWidgets()}

                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                    <h2 className="text-xl font-bold mb-8">Platform Revenue Overview</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockAnalytics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#d4af37"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#d4af37' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
