import StatusBadge from './StatusBadge';
import { formatCurrency } from '../../utils/formatters';

export default function ProductTable({ products, onEdit, onDelete }) {
    if (!products || products.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center text-gray-500 dark:text-slate-400 transition-colors">
                No products found
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Product Name</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">SKU</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Price</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Stock</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Status</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="py-3 px-4 text-gray-800 dark:text-white">{product.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{product.sku}</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-white text-right">{formatCurrency(product.price)}</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-white text-right">{product.stockQuantity}</td>
                                <td className="py-3 px-4 text-center">
                                    <StatusBadge status={product.status} />
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(product)}
                                            className="px-3 py-1 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
