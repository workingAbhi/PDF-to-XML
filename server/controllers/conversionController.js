// server/controllers/conversionController.js
const fs = require('fs-extra');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Builder } = require('xml2js');
const conversionModel = require('../models/conversionModel');

const conversionController = {
  async convertPdfToXml(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No PDF file uploaded' });
      }
      
      const { userId } = req.userData;
      const pdfPath = req.file.path;
      const pdfSize = req.file.size;
      const originalFilename = req.file.originalname;
      
      // Read PDF file
      const pdfBuffer = await fs.readFile(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      
      // Extract content from PDF
      const content = {
        document: {
          metadata: {
            filename: originalFilename,
            pages: pdfData.numpages,
            creationDate: new Date().toISOString()
          },
          content: {
            text: pdfData.text,
            // In a real app, you would need to use more sophisticated tools to extract tables, images, and structure
            // This is a simplified implementation
            structure: {
              paragraphs: pdfData.text.split('\n\n').filter(p => p.trim())
            }
          }
        }
      };
      
      // Convert to XML
      const builder = new Builder({
        renderOpts: { pretty: true, indent: '  ', newline: '\n' },
        headless: true
      });
      const xml = builder.buildObject(content);
      
      // Save XML file
      const xmlFilename = path.basename(pdfPath, '.pdf') + '.xml';
      const xmlPath = path.join(__dirname, '../uploads/xmls', xmlFilename);
      await fs.writeFile(xmlPath, xml);
      
      // Get XML file size
      const xmlStats = await fs.stat(xmlPath);
      const xmlSize = xmlStats.size;
      
      // Save conversion record to database
      const conversion = await conversionModel.create(
        userId,
        originalFilename,
        pdfPath,
        xmlPath,
        pdfSize,
        xmlSize,
        'success'
      );
      
      res.status(200).json({
        message: 'Conversion successful',
        conversion: {
          id: conversion.id,
          originalFilename: conversion.original_filename,
          createdAt: conversion.created_at,
          pdfSize,
          xmlSize,
          status: conversion.status,
          xmlUrl: `/api/conversions/${conversion.id}/download`
        }
      });
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ message: 'Conversion failed' });
    }
  },
  
  async getConversions(req, res) {
    try {
      const { userId } = req.userData;
      const conversions = await conversionModel.findByUserId(userId);
      
      const formattedConversions = conversions.map(conv => ({
        id: conv.id,
        originalFilename: conv.original_filename,
        createdAt: conv.created_at,
        pdfSize: conv.pdf_size,
        xmlSize: conv.xml_size,
        status: conv.status,
        xmlUrl: `/api/conversions/${conv.id}/download`
      }));
      
      res.status(200).json({ conversions: formattedConversions });
    } catch (error) {
      console.error('Get conversions error:', error);
      res.status(500).json({ message: 'Failed to fetch conversions' });
    }
  },
  
  async downloadXml(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userData.userId;
      
      const conversion = await conversionModel.findById(id, userId);
      if (!conversion) {
        return res.status(404).json({ message: 'Conversion not found' });
      }
      
      res.download(conversion.xml_file_path, `${conversion.original_filename}.xml`);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ message: 'Download failed' });
    }
  }
};

module.exports = conversionController;