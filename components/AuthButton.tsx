'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthButtonProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    image: string;
  };
}

export default function AuthButton({ isAuthenticated, user }: AuthButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link 
        href="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Sign Up / Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
      >
        <Image
          src={user?.image || '/default-avatar.png'}
          alt="Profile"
          width={40}
          height={40}
          className="object-cover"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
          <Link
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Llogaria
          </Link>
          <Link
            href="/my-plans"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Planet e mia
          </Link>
          <button
            onClick={() => {
              // Handle logout
              setIsDropdownOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Dil
          </button>
        </div>
      )}
    </div>
  );
} 