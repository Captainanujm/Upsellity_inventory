import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/products', icon: 'inventory', label: 'Products' },
    { path: '/stock-history', icon: 'history', label: 'Stock History' },
];

function NavIcon({ icon }) {
    const icons = {
        dashboard: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
        inventory: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        history: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };
    return icons[icon] || null;
}

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <aside
            className={`bg-slate-700 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-56' : 'w-16'
                }`}
        >
            {/* Header with toggle */}
            <div className={`flex items-center h-14 border-b border-slate-600 ${isExpanded ? 'px-4 justify-between' : 'justify-center'}`}>
                {isExpanded && (
                    <div className="flex items-center gap-2">
                        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-white font-semibold text-sm">Inventory</span>
                    </div>
                )}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                    title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                <div className={`mb-2 ${isExpanded ? 'px-4' : 'px-2'}`}>
                    {isExpanded && (
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Main Menu
                        </span>
                    )}
                </div>

                <ul className="space-y-1 px-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                                    } ${!isExpanded ? 'justify-center' : ''}`
                                }
                                title={!isExpanded ? item.label : undefined}
                            >
                                <NavIcon icon={item.icon} />
                                {isExpanded && (
                                    <span className="font-medium text-sm">{item.label}</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
