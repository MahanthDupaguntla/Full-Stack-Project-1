import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white dark:bg-zinc-900 shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-accent tracking-tighter">
                ART<span className="text-primary dark:text-white">FORGE</span>
            </Link>

            <div className="flex gap-6 items-center">
                <Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
                <Link to="/auctions" className="hover:text-accent transition-colors">Auctions</Link>

                {user ? (
                    <>
                        <Link to="/dashboard" className="px-4 py-1 border border-accent rounded hover:bg-accent hover:text-white transition-all">
                            Dashboard
                        </Link>
                        <button
                            onClick={logout}
                            className="text-red-500 hover:text-red-700 font-semibold"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-accent font-semibold">Login</Link>
                        <Link to="/register" className="btn-primary">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
