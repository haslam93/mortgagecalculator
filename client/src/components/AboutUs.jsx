import React from 'react';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About OptimalGreen Bank</h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-lg">
            Welcome to OptimalGreen Bank, your trusted partner in home financing. We are committed to 
            providing exceptional mortgage solutions tailored to your unique needs.
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Our Mission</h2>
            <p>
              At OptimalGreen Bank, our mission is to make homeownership accessible and affordable for everyone. 
              We believe that finding the right mortgage should be simple, transparent, and stress-free.
            </p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Competitive rates tailored to your financial situation</li>
              <li>Fast and easy online application process</li>
              <li>Expert guidance from experienced mortgage professionals</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Flexible loan options to fit your needs</li>
            </ul>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Our Commitment</h2>
            <p>
              We are dedicated to sustainable banking practices and supporting our communities. 
              Every loan we provide helps families achieve their dreams of homeownership while 
              contributing to a greener, more sustainable future.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-green-50 rounded-md border border-green-100">
            <h3 className="text-xl font-semibold text-green-900 mb-3">Get Started Today</h3>
            <p className="mb-4">
              Ready to find your perfect home loan? Our team is here to help you every step of the way.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
