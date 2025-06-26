'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f4f0fb] text-[#4e3084] shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          <span className="text-purple-600">Cart</span><span className="text-pink-500 text-lg align-super">IQ</span>
        </Link>
        <button
          className="md:hidden text-2xl text-[#4e3084]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <ul
          className={`md:flex space-y-4 md:space-y-0 md:space-x-8 absolute md:relative bg-[#f4f0fb] md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 p-6 md:p-0 shadow-md md:shadow-none rounded-b-2xl z-20 transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          <li>
            <Link href="/about" className="block py-2 md:py-0 font-medium hover:text-purple-600 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="block py-2 md:py-0 font-medium hover:text-purple-600 transition">
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block py-2 md:py-0 font-medium hover:text-purple-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/login" className="block py-2 md:py-0 font-medium hover:text-purple-600 transition">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;