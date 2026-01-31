const db = require('../data/products');

// Get all products with optional filtering, sorting, and search
exports.getAllProducts = (req, res) => {
    try {
        let products = db.getProducts();
        const { search, status, sortBy, sortOrder = 'asc' } = req.query;

        // Search by name or SKU
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.sku.toLowerCase().includes(searchLower)
            );
        }

        // Filter by status
        if (status && status !== 'all') {
            products = products.filter(p => db.getProductStatus(p) === status);
        }

        // Add status to each product
        products = products.map(p => ({
            ...p,
            status: db.getProductStatus(p)
        }));

        // Sort products
        if (sortBy) {
            products.sort((a, b) => {
                let valA = a[sortBy];
                let valB = b[sortBy];

                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (sortOrder === 'desc') {
                    return valA > valB ? -1 : valA < valB ? 1 : 0;
                }
                return valA < valB ? -1 : valA > valB ? 1 : 0;
            });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get single product by ID
exports.getProductById = (req, res) => {
    try {
        const product = db.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({
            ...product,
            status: db.getProductStatus(product)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Create new product
exports.createProduct = (req, res) => {
    try {
        const { name, sku, price, stockQuantity, minStockThreshold = 5 } = req.body;

        // Validation
        const errors = [];
        if (!name || !name.trim()) {
            errors.push({ field: 'name', message: 'Product name is required' });
        }
        if (!sku || !sku.trim()) {
            errors.push({ field: 'sku', message: 'SKU is required' });
        }
        if (sku && db.getProductBySku(sku)) {
            errors.push({ field: 'sku', message: 'SKU already exists' });
        }
        if (price === undefined || price === null || price < 0) {
            errors.push({ field: 'price', message: 'Price must be a positive number' });
        }
        if (stockQuantity === undefined || stockQuantity === null || stockQuantity < 0) {
            errors.push({ field: 'stockQuantity', message: 'Stock quantity must be 0 or greater' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newProduct = db.addProduct({
            name: name.trim(),
            sku: sku.trim().toUpperCase(),
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            minStockThreshold: parseInt(minStockThreshold)
        });

        res.status(201).json({
            ...newProduct,
            status: db.getProductStatus(newProduct)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update product
exports.updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, sku, price, stockQuantity, minStockThreshold } = req.body;

        const existingProduct = db.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Validation
        const errors = [];
        if (name !== undefined && !name.trim()) {
            errors.push({ field: 'name', message: 'Product name cannot be empty' });
        }
        if (sku !== undefined) {
            if (!sku.trim()) {
                errors.push({ field: 'sku', message: 'SKU cannot be empty' });
            } else {
                const skuProduct = db.getProductBySku(sku);
                if (skuProduct && skuProduct.id !== id) {
                    errors.push({ field: 'sku', message: 'SKU already exists' });
                }
            }
        }
        if (price !== undefined && price < 0) {
            errors.push({ field: 'price', message: 'Price must be a positive number' });
        }
        if (stockQuantity !== undefined && stockQuantity < 0) {
            errors.push({ field: 'stockQuantity', message: 'Stock quantity must be 0 or greater' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const updates = {};
        if (name !== undefined) updates.name = name.trim();
        if (sku !== undefined) updates.sku = sku.trim().toUpperCase();
        if (price !== undefined) updates.price = parseFloat(price);
        if (stockQuantity !== undefined) updates.stockQuantity = parseInt(stockQuantity);
        if (minStockThreshold !== undefined) updates.minStockThreshold = parseInt(minStockThreshold);

        const updatedProduct = db.updateProduct(id, updates);

        res.json({
            ...updatedProduct,
            status: db.getProductStatus(updatedProduct)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete product
exports.deleteProduct = (req, res) => {
    try {
        const deleted = db.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// Get analytics for dashboard
exports.getAnalytics = (req, res) => {
    try {
        const products = db.getProducts();

        let totalProducts = products.length;
        let totalInventoryValue = 0;
        let lowStockCount = 0;
        let outOfStockCount = 0;
        let inStockCount = 0;
        const lowStockItems = [];

        products.forEach(product => {
            totalInventoryValue += product.price * product.stockQuantity;
            const status = db.getProductStatus(product);

            if (status === 'out-of-stock') {
                outOfStockCount++;
            } else if (status === 'low-stock') {
                lowStockCount++;
                lowStockItems.push({
                    id: product.id,
                    name: product.name,
                    currentStock: product.stockQuantity,
                    threshold: product.minStockThreshold
                });
            } else {
                inStockCount++;
            }
        });

        res.json({
            totalProducts,
            totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
            lowStockCount,
            outOfStockCount,
            inStockCount,
            lowStockItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

// Get stock history
exports.getStockHistory = (req, res) => {
    try {
        const history = db.getStockHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock history' });
    }
};
