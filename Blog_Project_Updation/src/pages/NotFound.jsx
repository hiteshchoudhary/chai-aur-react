import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <div className="text-9xl font-bold flex items-center justify-center">
        <span className="relative">
          <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full blur-2xl"></span>
          <span className="relative">4</span>
        </span>
        <span className="relative">
          <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full blur-2xl"></span>
          <span className="relative">0</span>
        </span>
        <span className="relative">
          <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full blur-2xl"></span>
          <span className="relative">4</span>
        </span>
      </div>
      <p className="mt-4 text-lg text-gray-600">This page doesn't exist. <Link to="/" className="text-pink-500 hover:underline">Go back home.</Link></p>
    </div>
  );
};

export default NotFound;