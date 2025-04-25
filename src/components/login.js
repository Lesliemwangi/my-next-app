'use client';

import React from 'react';

export default function Login() {  // Capitalized component name
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-12">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-8 border border-white/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="text-white/80 mt-2">Welcome back</p>
        </div>
        
        {/* Login form will go here */}
        <div className="text-white">Login form coming soon</div>
      </div>
    </div>
  );
}