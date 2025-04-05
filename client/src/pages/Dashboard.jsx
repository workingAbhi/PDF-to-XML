import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ConversionForm from '../components/conversion/ConversionForm';
import ConversionHistory from '../components/conversion/ConversionHistory';
import { getConversions } from '../services/conversion';

const Dashboard = () => {
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversions();
  }, []);

  const fetchConversions = async () => {
    try {
      setLoading(true);
      const response = await getConversions();
      setConversions(response.conversions);
      setError('');
    } catch (err) {
      setError('Failed to load conversion history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConversionComplete = (newConversion) => {
    setConversions([newConversion, ...conversions]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <ConversionForm onConversionComplete={handleConversionComplete} />
          
          <ConversionHistory conversions={conversions} loading={loading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
