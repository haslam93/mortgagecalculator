import React from 'react';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 px-8 py-12 text-white">
          <h1 className="text-4xl font-extrabold mb-4">About OptimalPurple Bank</h1>
          <p className="text-xl text-purple-100">Your trusted partner in home financing since 1985</p>
        </div>

        {/* Main Content */}
        <div className="px-8 py-10 space-y-8">
          {/* Mission Statement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At OptimalPurple Bank, we are committed to making homeownership accessible and affordable for everyone. 
              We believe that finding the right mortgage should be simple, transparent, and stress-free. Our team of 
              experienced mortgage professionals works tirelessly to provide personalized solutions that fit your unique 
              financial situation.
            </p>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Competitive Rates</h3>
                <p className="text-gray-700">
                  We offer some of the most competitive mortgage rates in the industry, helping you save thousands 
                  over the life of your loan.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-700">
                  Our certified mortgage advisors have decades of combined experience and are here to guide you 
                  through every step of the process.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Fast Approval</h3>
                <p className="text-gray-700">
                  Our streamlined application process and advanced technology enable quick pre-approvals, often 
                  within 24 hours.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Customer First</h3>
                <p className="text-gray-700">
                  Your satisfaction is our priority. We're available 7 days a week to answer questions and provide 
                  support throughout your home buying journey.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Founded in 1985, OptimalPurple Bank started as a small community lender with a vision to revolutionize 
              the mortgage industry. Over the past four decades, we've grown to serve thousands of families across 
              the nation, helping them achieve their dream of homeownership.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we combine traditional values of personalized service with cutting-edge technology to deliver 
              the best mortgage experience possible. Our commitment to innovation, integrity, and customer satisfaction 
              has made us one of the most trusted names in home lending.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-700">1-800-OPTIMAL</p>
                <p className="text-gray-700">(1-800-678-4625)</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-700">info@optimalpurple.com</p>
                <p className="text-gray-700">support@optimalpurple.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                <p className="text-gray-700">Monday - Friday: 8am - 8pm</p>
                <p className="text-gray-700">Saturday - Sunday: 9am - 5pm</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 text-lg mb-6">
              Let us help you find the perfect mortgage solution for your dream home.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-colors">
              Apply Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
