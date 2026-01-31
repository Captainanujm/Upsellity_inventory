export default function StatCard({ title, value, color = 'text-gray-900 dark:text-white' }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    );
}
