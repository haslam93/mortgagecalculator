import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MortgageCalculator from './components/MortgageCalculator';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Find Your Perfect Home Loan
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Compare rates, calculate payments, and get pre-approved in minutes.
              </p>
            </div>
            
            <Routes>
              <Route path="/" element={<MortgageCalculator view="all" />} />
              <Route path="/rates" element={<MortgageCalculator view="rates" />} />
              <Route path="/calculators" element={<MortgageCalculator view="calculator" />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
