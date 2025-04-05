import React from 'react';
import { downloadXml } from '../../services/conversion';
import { formatFileSize, formatDate } from '../../utils/helpers';

const ConversionHistory = ({ conversions, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!conversions || conversions.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <p className="text-gray-500 text-center">No conversion history found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Conversion History</h2>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PDF Size
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              XML Size
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {conversions.map((conversion) => (
            <tr key={conversion.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {conversion.originalFilename}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(conversion.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatFileSize(conversion.pdfSize)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatFileSize(conversion.xmlSize)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  conversion.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {conversion.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {conversion.status === 'success' && (
                  <button
                    onClick={() => downloadXml(conversion.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Download XML
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConversionHistory;
