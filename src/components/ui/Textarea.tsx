import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    charCount?: number;
    maxChars?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, charCount, maxChars, className = '', id, ...props }, ref) => {
        const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    {label && (
                        <label
                            htmlFor={textareaId}
                            className="block text-sm font-medium text-surface-700"
                        >
                            {label}
                        </label>
                    )}
                    {maxChars !== undefined && charCount !== undefined && (
                        <span
                            className={`text-xs ${charCount > maxChars ? 'text-danger-600' : 'text-surface-400'
                                }`}
                        >
                            {charCount}/{maxChars}
                        </span>
                    )}
                </div>
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={`
            w-full rounded-lg border border-surface-300 px-3.5 py-2.5
            text-sm text-surface-900 placeholder-surface-400
            transition-colors duration-200 resize-none
            focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
            disabled:bg-surface-100 disabled:cursor-not-allowed
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-danger-600 animate-fade-in">{error}</p>
                )}
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';
