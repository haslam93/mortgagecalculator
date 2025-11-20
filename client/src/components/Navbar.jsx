import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="font-bold text-xl tracking-tight">OptimalGreen</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="bg-green-800 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/rates" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">Mortgage Rates</Link>
                <Link to="/calculators" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">Calculators</Link>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
