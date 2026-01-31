export default function LowStockAlerts({ items }) {
    if (!items || items.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Low Stock Alerts</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm">No low stock items</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Low Stock Alerts</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-600">
                            <th className="pb-3 font-medium">Product</th>
                            <th className="pb-3 font-medium text-right">Current Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100 dark:border-slate-700 last:border-0">
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-800 dark:text-white">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 text-right text-gray-600 dark:text-slate-300">{item.currentStock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
