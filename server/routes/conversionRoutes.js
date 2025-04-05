// server/routes/conversionRoutes.js
const express = require('express');
const conversionController = require('../controllers/conversionController');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/convert', upload.single('pdf'), conversionController.convertPdfToXml);
router.get('/', conversionController.getConversions);
router.get('/:id/download', conversionController.downloadXml);

module.exports = router;