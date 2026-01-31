import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InventoryChart({ inStock, lowStock, outOfStock }) {
    const { isDark } = useTheme();

    const data = {
        labels: ['In Stock', 'Low Stock', 'Out of Stock'],
        datasets: [
            {
                label: 'Products',
                data: [inStock, lowStock, outOfStock],
                backgroundColor: ['#4a8c7b', '#e37777', '#c45c5c'],
                borderRadius: 4,
                barThickness: 60,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 20,
                    font: { size: 12 },
                    color: isDark ? '#94a3b8' : '#6b7280',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: isDark ? '#334155' : '#f3f4f6' },
                ticks: {
                    stepSize: 20,
                    color: isDark ? '#94a3b8' : '#6b7280',
                },
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: isDark ? '#94a3b8' : '#6b7280',
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Inventory Overview</h3>
            <div className="h-64">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
