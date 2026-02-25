import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'visitor'
    });
    const { register } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
        } catch (err) {
            setError('Registration failed. Email might be taken.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary dark:bg-zinc-800">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Join as</label>
                        <select
                            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="visitor">Visitor</option>
                            <option value="artist">Artist</option>
                            <option value="curator">Curator</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full btn-primary mt-4 py-3">Register</button>
                </form>
                <p className="mt-6 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-accent hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
