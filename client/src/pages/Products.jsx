import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/products/SearchBar';
import FilterDropdown from '../components/products/FilterDropdown';
import SortDropdown from '../components/products/SortDropdown';
import ProductTable from '../components/products/ProductTable';
import ProductModal from '../components/products/ProductModal';
import DeleteModal from '../components/products/DeleteModal';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortValue, setSortValue] = useState('name-asc');

    // Modal states
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const [sortBy, sortOrder] = sortValue.split('-');
            const { data } = await getProducts({
                search,
                status: statusFilter,
                sortBy,
                sortOrder,
            });
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, sortValue]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    function handleAddClick() {
        setEditingProduct(null);
        setShowProductModal(true);
    }

    function handleEditClick(product) {
        setEditingProduct(product);
        setShowProductModal(true);
    }

    function handleDeleteClick(product) {
        setProductToDelete(product);
        setShowDeleteModal(true);
    }

    async function handleProductSubmit(data) {
        try {
            setIsSubmitting(true);
            if (editingProduct) {
                await updateProduct(editingProduct.id, data);
            } else {
                await createProduct(data);
            }
            setShowProductModal(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.error('Failed to save product:', err);
            alert(err.response?.data?.errors?.[0]?.message || 'Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteConfirm() {
        if (!productToDelete) return;
        try {
            setIsSubmitting(true);
            await deleteProduct(productToDelete.id);
            setShowDeleteModal(false);
            setProductToDelete(null);
            fetchProducts();
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Get low stock items for alerts section
    const lowStockItems = products
        .filter((p) => p.status === 'low-stock')
        .map((p) => ({
            id: p.id,
            name: p.name,
            currentStock: p.stockQuantity,
        }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 max-w-md">
                    <SearchBar value={search} onChange={setSearch} />
                </div>
                <div className="flex gap-3 flex-wrap">
                    <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
                    <SortDropdown value={sortValue} onChange={setSortValue} />
                    <button
                        onClick={handleAddClick}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Product
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    <ProductTable
                        products={products}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />

                    {lowStockItems.length > 0 && (
                        <LowStockAlerts items={lowStockItems} />
                    )}
                </>
            )}

            <ProductModal
                isOpen={showProductModal}
                onClose={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleProductSubmit}
                product={editingProduct}
                isSubmitting={isSubmitting}
            />

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                productName={productToDelete?.name}
                isDeleting={isSubmitting}
            />
        </div>
    );
}
