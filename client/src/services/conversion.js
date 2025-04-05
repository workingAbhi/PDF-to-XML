import api from './api';

export const convertPdfToXml = async (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  
  const response = await api.post('/conversions/convert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getConversions = async () => {
  const response = await api.get('/conversions');
  return response.data;
};

export const downloadXml = async (conversionId) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // Create an anchor element
    const a = document.createElement('a');
    
    // Set the href to the download endpoint with the token as a query parameter
    a.href = `http://localhost:5000/api/conversions/${conversionId}/download?token=${token}`;
    
    // Set download attribute to force download
    a.setAttribute('download', '');
    
    // Append to body, click, and remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download error:', error);
  }
};
