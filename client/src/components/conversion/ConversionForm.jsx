import React, { useState } from 'react';
import { convertPdfToXml } from '../../services/conversion';

const ConversionForm = ({ onConversionComplete }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await convertPdfToXml(file);
      
      setFile(null);
      e.target.reset();
      
      if (onConversionComplete) {
        onConversionComplete(response.conversion);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Convert PDF to XML</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdf">
            Select PDF File
          </label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            disabled={loading}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading || !file}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(loading || !file) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Converting...' : 'Convert to XML'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversionForm;
