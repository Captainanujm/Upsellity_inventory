import { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import InventoryChart from '../components/dashboard/InventoryChart';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';
import { getAnalytics } from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function Dashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    async function fetchAnalytics() {
        try {
            setLoading(true);
            const { data } = await getAnalytics();
            setAnalytics(data);
        } catch (err) {
            setError('Failed to load analytics');
            console.error(err);
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

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                {error}
                <button onClick={fetchAnalytics} className="ml-4 underline">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Products" value={analytics.totalProducts} />
                <StatCard
                    title="Total Inventory Value"
                    value={formatCurrency(analytics.totalInventoryValue)}
                    color="text-green-600 dark:text-green-400"
                />
                <StatCard
                    title="Low Stock Items"
                    value={analytics.lowStockCount}
                    color="text-yellow-600 dark:text-yellow-400"
                />
                <StatCard
                    title="Out of Stock Items"
                    value={analytics.outOfStockCount}
                    color="text-red-600 dark:text-red-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InventoryChart
                    inStock={analytics.inStockCount}
                    lowStock={analytics.lowStockCount}
                    outOfStock={analytics.outOfStockCount}
                />
                <LowStockAlerts items={analytics.lowStockItems} />
            </div>
        </div>
    );
}
