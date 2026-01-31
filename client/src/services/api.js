import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Products API
export const getProducts = (params = {}) => {
    return api.get('/products', { params });
};

export const getProduct = (id) => {
    return api.get(`/products/${id}`);
};

export const createProduct = (data) => {
    return api.post('/products', data);
};

export const updateProduct = (id, data) => {
    return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};

// Analytics API
export const getAnalytics = () => {
    return api.get('/analytics');
};

// Stock History API
export const getStockHistory = () => {
    return api.get('/stock-history');
};

export default api;
