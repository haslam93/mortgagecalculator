import React, { useState, useEffect } from 'react';

export default function MortgageCalculator({ view = 'all' }) {
  const [rates, setRates] = useState([]);
  const [formData, setFormData] = useState({
    loanAmount: 300000,
    interestRate: 6.5,
    loanTermYears: 30
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/rates')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setRates(data.data);
          // Set default rate from first available
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, interestRate: data.data[0].interest_rate }));
          }
        }
      })
      .catch(err => console.error("Failed to fetch rates", err));
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        alert(data.error || "Calculation failed");
      }
    } catch (error) {
      console.error("Error calculating", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`grid grid-cols-1 ${view === 'all' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
        
        {/* Calculator Section */}
        {(view === 'all' || view === 'calculator') && (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mortgage Calculator</h2>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
              <input 
                type="number" 
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={formData.interestRate}
                onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
              <select 
                value={formData.loanTermYears}
                onChange={(e) => setFormData({...formData, loanTermYears: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              >
                <option value="30">30 Years</option>
                <option value="15">15 Years</option>
                <option value="10">10 Years</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? 'Calculating...' : 'Calculate Payment'}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-4 bg-purple-50 rounded-md border border-purple-100">
              <h3 className="text-lg font-medium text-purple-900">Estimated Monthly Payment</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">${result.monthlyPayment}</p>
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>Total Principal & Interest: ${result.totalPayment}</p>
                <p>Total Interest Paid: ${result.totalInterest}</p>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Rates Section */}
        {(view === 'all' || view === 'rates') && (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Mortgage Rates</h2>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setFormData({...formData, interestRate: rate.interest_rate, loanTermYears: rate.term_years})}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.product_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.interest_rate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.apr}%</td>
                  </tr>
                ))}
                {rates.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Loading rates...</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-gray-500">
              * Rates are for informational purposes only and subject to change. Click a row to use that rate.
            </p>
          </div>
        </div>
        )}

      </div>
    </div>
  );
}
