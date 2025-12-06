'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/button/button';
import { authApi } from '@/app/service/api';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<'Guest' | 'Host'>('Guest');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        birthDate: '',
        nationality: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // 1. Validate Tuổi (Business Rule: >= 18 tuổi)
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            setError('You need to be 18 years old.');
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: role.toUpperCase() as 'GUEST' | 'HOST',
                phoneNumber: formData.phone,
                birthDate: formData.birthDate,
                nationality: formData.nationality || 'Vietnam',
                // preferredPayment: role === 'Guest' ? 'Cash' : undefined,
            };

            await authApi.register(payload);

            alert("Successful! Please Log in.");
            router.push('/login');
            
        } catch (err: any) {
            console.error("Register Error:", err);
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[550px] px-6">
            <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200 p-4 text-center bg-gray-50">
                    <h3 className="font-bold text-base text-gray-800">Register</h3>
                </div>
                <div className="p-5">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Airbkb</h2>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">You want to be a?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    onClick={() => setRole('Guest')}
                                    className={`cursor-pointer border rounded-lg p-3 text-center transition-all duration-200 ${role === 'Guest'
                                            ? 'border-rose-600 bg-rose-50 text-rose-700 ring-1 ring-rose-600'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                                        }`}
                                >
                                    <div className="font-bold">Guest</div>
                                    <div className="text-xs mt-1">I want to book</div>
                                </div>

                                <div
                                    onClick={() => setRole('Host')}
                                    className={`cursor-pointer border rounded-lg p-3 text-center transition-all duration-200 ${role === 'Host'
                                            ? 'border-rose-600 bg-rose-50 text-rose-700 ring-1 ring-rose-600'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                                        }`}
                                >
                                    <div className="font-bold">Host</div>
                                    <div className="text-xs mt-1">I want to rent</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text" required
                                    className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="email" required
                                    className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="tel" required
                                    className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <input type="text" required className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Nationality"
                                    value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                    <input
                                        type="date" required
                                        className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-gray-900"
                                        title="BirthDay"
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    />
                                    {!formData.birthDate && (
                                        <span className="absolute left-4 top-4 text-gray-500 pointer-events-none bg-white px-1"></span>
                                    )}
                            </div>
                            <div>
                                <input
                                    type="password" required
                                    className="w-full p-2.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <p className="text-xs text-gray-500">
                            By <strong>signing up</strong>, you agree to our <span className="underline cursor-pointer text-blue-500">Terms and conditions</span>
                        </p>

                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="primary" 
                            className="bg-gradient-to-r from-rose-500 to-rose-600 py-3.5 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Agree and Continue'}
                        </Button>
                    </form>
                    <div className="mt-4 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">Already have an acoount?</p>
                        <Link href="/login" className="text-rose-600 font-bold hover:underline mt-1 block">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}