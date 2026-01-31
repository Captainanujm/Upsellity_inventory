import { useState, useEffect } from 'react';
import { getStockHistory } from '../services/api';
import { formatDate } from '../utils/formatters';

export default function StockHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        try {
            setLoading(true);
            const { data } = await getStockHistory();
            setHistory(data);
        } catch (err) {
            console.error('Failed to fetch stock history:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Stock History</h1>

            {history.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center text-gray-500 dark:text-slate-400 transition-colors">
                    No stock changes recorded yet. Edit a product's stock to see changes here.
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Product</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">SKU</th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Change</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">Previous</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-300">New Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry) => (
                                    <tr key={entry.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="py-3 px-4 text-gray-600 dark:text-slate-400 text-sm">
                                            {formatDate(entry.timestamp)}
                                        </td>
                                        <td className="py-3 px-4 text-gray-800 dark:text-white">{entry.productName}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{entry.productSku}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${entry.change > 0
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                    }`}
                                            >
                                                {entry.change > 0 ? '+' : ''}{entry.change}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-slate-400 text-right">{entry.previousStock}</td>
                                        <td className="py-3 px-4 text-gray-800 dark:text-white text-right font-medium">{entry.newStock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
