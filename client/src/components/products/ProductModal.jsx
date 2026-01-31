import { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSubmit, product, isSubmitting }) {
    const isEdit = !!product;
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        stockQuantity: '',
        minStockThreshold: '5',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                sku: product.sku,
                price: product.price.toString(),
                stockQuantity: product.stockQuantity.toString(),
                minStockThreshold: product.minStockThreshold.toString(),
            });
        } else {
            setFormData({
                name: '',
                sku: '',
                price: '',
                stockQuantity: '',
                minStockThreshold: '5',
            });
        }
        setErrors({});
    }, [product, isOpen]);

    function validate() {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!formData.sku.trim()) {
            newErrors.sku = 'SKU is required';
        }
        if (!formData.price || parseFloat(formData.price) < 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (formData.stockQuantity === '' || parseInt(formData.stockQuantity) < 0) {
            newErrors.stockQuantity = 'Stock quantity is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            name: formData.name.trim(),
            sku: formData.sku.trim(),
            price: parseFloat(formData.price),
            stockQuantity: parseInt(formData.stockQuantity),
            minStockThreshold: parseInt(formData.minStockThreshold) || 5,
        });
    }

    function handleChange(field, value) {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto transition-colors">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {isEdit ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors ${errors.name ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-600'
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            SKU
                        </label>
                        <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => handleChange('sku', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors ${errors.sku ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-600'
                                }`}
                        />
                        {errors.sku && (
                            <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
                        )}
                    </div>

                    <div className={isEdit ? 'grid grid-cols-2 gap-4' : ''}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    className={`w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors ${errors.price ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-600'
                                        }`}
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                            )}
                        </div>

                        {isEdit && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.stockQuantity}
                                    onChange={(e) => handleChange('stockQuantity', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors ${errors.stockQuantity ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-600'
                                        }`}
                                />
                                {errors.stockQuantity && (
                                    <p className="mt-1 text-sm text-red-500">{errors.stockQuantity}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {!isEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.stockQuantity}
                                onChange={(e) => handleChange('stockQuantity', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors ${errors.stockQuantity ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-slate-600'
                                    }`}
                            />
                            {errors.stockQuantity && (
                                <p className="mt-1 text-sm text-red-500">{errors.stockQuantity}</p>
                            )}
                        </div>
                    )}

                    {isEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                Minimum Stock Threshold
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const current = parseInt(formData.minStockThreshold) || 0;
                                        handleChange('minStockThreshold', Math.max(0, current - 1).toString());
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-slate-300 transition-colors"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.minStockThreshold}
                                    onChange={(e) => handleChange('minStockThreshold', e.target.value)}
                                    className="w-16 px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const current = parseInt(formData.minStockThreshold) || 0;
                                        handleChange('minStockThreshold', (current + 1).toString());
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-slate-300 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                                Current Stock: <span className="font-medium">{formData.stockQuantity || 0}</span>
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
