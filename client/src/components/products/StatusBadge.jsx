import { getStatusColor, getStatusLabel } from '../../utils/formatters';

export default function StatusBadge({ status }) {
    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
        </span>
    );
}
