import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
    type: 'error' | 'success';
    message: string;
    className?: string;
}

export function Alert({ type, message, className = '' }: AlertProps) {
    const styles = {
        error: 'bg-danger-50 text-danger-700 border-danger-200',
        success: 'bg-success-50 text-success-600 border-success-200',
    };

    const Icon = type === 'error' ? AlertCircle : CheckCircle;

    return (
        <div
            className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm animate-fade-in ${styles[type]} ${className}`}
            role="alert"
        >
            <Icon className="h-4 w-4 shrink-0" />
            <p>{message}</p>
        </div>
    );
}
