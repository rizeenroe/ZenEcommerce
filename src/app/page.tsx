'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Main from './pages/main';


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="relative p-6">
      {/* Dimmed Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" />
      )}

      {/* Navigation Bar */}
      <div
        className={`flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md relative z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {/* Left: Burger Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`text-2xl text-gray-700 focus:outline-none transition-transform duration-300 ${
            menuOpen ? 'rotate-180' : ''
          }`}
        >
          &#9776;
        </button>

        {/* Center: Search Bar */}
        <div className="grow mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Profile & Cart Icons */}
        <div className="flex items-center space-x-4">
          <a href="">
            <Image
              src="/profile.png"
              alt="Profile"
              width={28}
              height={28}
              className="filter brightness-0"
            />
          </a>
          <a href="">
            <Image
              src="/cart.png"
              alt="Cart"
              width={28}
              height={28}
              className="filter brightness-0"
            />
          </a>
        </div>
      </div>

      {/* Side-Sliding Burger Menu */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-4">
          <a href="" className="block text-gray-700 hover:text-blue-600">Home</a>
          <a href="" className="block text-gray-700 hover:text-blue-600">Categories</a>
          <a href="" className="block text-gray-700 hover:text-blue-600">Trending</a>
          <a href="" className="block text-gray-700 hover:text-blue-600">Programs</a>
          <a href="" className="block text-gray-700 hover:text-blue-600">Wishlist</a>
        </div>
      </div>

      {/* Page Title */}
      {/* <h1
        className={`text-3xl font-bold mt-6 transition-opacity duration-300 ${
          menuOpen ? 'opacity-30' : 'opacity-100'
        }`}
      >
        E Commerce
      </h1> */}
      <Main />
    </div>
  );
}