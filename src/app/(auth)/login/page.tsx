'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { authApi } from '@/app/service/api';
import Button from '@/app/components/button/button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authApi.login({ email, password });
      if (data.access_token) {
        Cookies.set('accessToken', data.access_token, { expires: 1 });
      }

      localStorage.setItem('user', JSON.stringify(data.user));

      const role = data.user.role; 

      if (role === 'ADMIN') {
        router.push('/admin');
      } else if (role === 'HOST') {
        router.push('/host');
      } else {
        router.push('/');
      }
      
      router.refresh(); 

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-[500px] bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4 text-center bg-gray-50">
            <h3 className="font-bold text-base text-gray-800">Log In</h3>
        </div>
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-2 text-center">
                Welcome to Airbkb
            </h2>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                    {error}
                </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <input
                        type="email"
                        required
                        className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 text-gray-900 transition"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 text-gray-900 transition"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    We will call or send message to confirm the phone number.<span className="underline font-bold cursor-pointer">Private policy</span>
                </p>
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-lg text-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Continue'}
                </Button>
            </form>

            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-gray-500 font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Link Đăng ký */}
            <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
                <Link href="/register">
                    <Button className="w-full border border-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Register account
                    </Button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}