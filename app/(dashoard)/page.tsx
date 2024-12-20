// app/page.tsx
'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in'); // Navigate to the sign-in page
  };

  const handleSignUp = () => {
    router.push('/sign-up'); // Navigate to the sign-up page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Welcome to the Dashboard</h1>
      <div className="flex gap-4">
        <button
          onClick={handleSignIn}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
