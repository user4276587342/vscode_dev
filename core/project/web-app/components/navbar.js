"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500">MovieReview</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:text-red-400">Home</Link></li>
          <li><Link href="/reviews" className="hover:text-red-400">Reviews</Link></li>
          <li><Link href="/genres" className="hover:text-red-400">Genres</Link></li>
          <li><Link href="/trending" className="hover:text-red-400">Trending</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 text-center py-4 space-y-4">
          <li><Link href="/" className="block hover:text-red-400">Home</Link></li>
          <li><Link href="/reviews" className="block hover:text-red-400">Reviews</Link></li>
          <li><Link href="/genres" className="block hover:text-red-400">Genres</Link></li>
          <li><Link href="/trending" className="block hover:text-red-400">Trending</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;