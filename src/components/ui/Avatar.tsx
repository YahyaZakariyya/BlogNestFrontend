import { getInitials } from '@/utils';

interface AvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses: Record<string, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
};

// Deterministic color based on name
function getAvatarColor(name: string): string {
    const colors = [
        'bg-primary-500',
        'bg-indigo-500',
        'bg-violet-500',
        'bg-pink-500',
        'bg-rose-500',
        'bg-orange-500',
        'bg-amber-500',
        'bg-emerald-500',
        'bg-teal-500',
        'bg-cyan-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
    return (
        <div
            className={`
        ${sizeClasses[size]} ${getAvatarColor(name)}
        inline-flex items-center justify-center rounded-full
        font-semibold text-white select-none shrink-0
        ${className}
      `}
            title={name}
        >
            {getInitials(name)}
        </div>
    );
}
