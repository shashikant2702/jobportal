'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'applicant',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-600 via-purple-500 to-indigo-800">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-4 mb-4 border text-black placeholder:text-fuchsia-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 mb-4 border text-black placeholder:text-fuchsia-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 mb-4 border text-black placeholder:text-fuchsia-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full p-4 mb-6 border text-fuchsia-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="applicant">Applicant</option>
            <option value="company">Company</option>
          </select>
          <button
            type="submit"
            className={`w-full p-4 text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ${
              loading ? 'cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
