export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

export function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateString));
}

export function getStatusColor(status) {
    switch (status) {
        case 'in-stock':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'low-stock':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'out-of-stock':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
}

export function getStatusLabel(status) {
    switch (status) {
        case 'in-stock':
            return 'In Stock';
        case 'low-stock':
            return 'Low Stock';
        case 'out-of-stock':
            return 'Out of Stock';
        default:
            return status;
    }
}
