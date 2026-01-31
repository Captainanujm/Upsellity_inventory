const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product CRUD routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Analytics route
router.get('/analytics', productController.getAnalytics);

// Stock history route
router.get('/stock-history', productController.getStockHistory);

module.exports = router;
