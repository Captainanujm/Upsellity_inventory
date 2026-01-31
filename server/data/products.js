const { v4: uuidv4 } = require('uuid');

// In-memory product storage
let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    sku: 'LP103',
    price: 849.99,
    stockQuantity: 34,
    minStockThreshold: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Wireless Mouse',
    sku: 'WM203',
    price: 19.99,
    stockQuantity: 2,
    minStockThreshold: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Headphones',
    sku: 'HP402',
    price: 129.00,
    stockQuantity: 25,
    minStockThreshold: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Keyboard',
    sku: 'KB301',
    price: 49.99,
    stockQuantity: 0,
    minStockThreshold: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'iPhone 14',
    sku: 'IP014',
    price: 999.00,
    stockQuantity: 3,
    minStockThreshold: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'USB-C Cable',
    sku: 'UC501',
    price: 12.99,
    stockQuantity: 150,
    minStockThreshold: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Monitor 27"',
    sku: 'MN270',
    price: 299.99,
    stockQuantity: 8,
    minStockThreshold: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Webcam HD',
    sku: 'WC100',
    price: 79.99,
    stockQuantity: 0,
    minStockThreshold: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Stock history log
let stockHistory = [];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductBySku(sku) {
  return products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
}

function addProduct(product) {
  const newProduct = {
    id: uuidv4(),
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  products.push(newProduct);
  return newProduct;
}

function updateProduct(id, updates) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  const oldProduct = products[index];
  
  // Log stock change if quantity changed
  if (updates.stockQuantity !== undefined && updates.stockQuantity !== oldProduct.stockQuantity) {
    logStockChange(oldProduct, updates.stockQuantity);
  }

  products[index] = {
    ...oldProduct,
    ...updates,
    id: oldProduct.id,
    createdAt: oldProduct.createdAt,
    updatedAt: new Date().toISOString()
  };

  return products[index];
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

function logStockChange(product, newQuantity) {
  const change = newQuantity - product.stockQuantity;
  stockHistory.unshift({
    id: uuidv4(),
    productId: product.id,
    productName: product.name,
    productSku: product.sku,
    previousStock: product.stockQuantity,
    newStock: newQuantity,
    change: change,
    timestamp: new Date().toISOString()
  });
}

function getStockHistory() {
  return stockHistory;
}

function getProductStatus(product) {
  if (product.stockQuantity === 0) return 'out-of-stock';
  if (product.stockQuantity <= product.minStockThreshold) return 'low-stock';
  return 'in-stock';
}

module.exports = {
  getProducts,
  getProductById,
  getProductBySku,
  addProduct,
  updateProduct,
  deleteProduct,
  getStockHistory,
  getProductStatus
};
