import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ArtworkGallery from './pages/ArtworkGallery';
import AuctionPage from './pages/AuctionPage';

const App = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gallery" element={<ArtworkGallery />} />
                <Route path="/auctions" element={<AuctionPage />} />
                <Route
                    path="/dashboard/*"
                    element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </div>
    );
};

export default App;
