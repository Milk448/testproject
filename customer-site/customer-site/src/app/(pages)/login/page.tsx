'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api/customerApi';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);
      const { token } = response.data;
      
      login(token);
      router.push('/workshops');
    } catch (err) {
        console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/images/cover.jpg"
            width={32}
            height={32}
            alt="Login"
            className="h-8 w-8 rounded-full object-cover mr-2"
            onError={() => console.error('Header image failed to load: /images/workshop.jpg')}
          />
          <h2 className="text-2xl font-bold text-gray-800 font-poppins sm:text-xl">
            Welcome Back!
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-poppins text-sm transition-all duration-300">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-2 border ${loading ? 'bg-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-poppins transition-all duration-300 disabled:cursor-not-allowed`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-2 border ${loading ? 'bg-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-poppins transition-all duration-300 disabled:cursor-not-allowed`}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white bg-indigo-600 rounded-lg font-poppins transition-all duration-300 ${
              loading ? 'bg-indigo-300 cursor-not-allowed animate-pulse' : 'hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center font-poppins">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-amber-400 hover:text-amber-500 hover:underline transition-all duration-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;