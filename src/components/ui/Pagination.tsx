import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMeta } from '@/types';

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
    const { current_page, last_page } = meta;

    if (last_page <= 1) return null;

    const getPageNumbers = (): (number | '...')[] => {
        const pages: (number | '...')[] = [];

        if (last_page <= 7) {
            for (let i = 1; i <= last_page; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (current_page > 3) {
            pages.push('...');
        }

        const start = Math.max(2, current_page - 1);
        const end = Math.min(last_page - 1, current_page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (current_page < last_page - 2) {
            pages.push('...');
        }

        pages.push(last_page);

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
            <button
                onClick={() => onPageChange(current_page - 1)}
                disabled={current_page === 1}
                className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                    <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-1 text-sm text-surface-400"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${page === current_page
                                ? 'bg-primary-600 text-white shadow-sm'
                                : 'text-surface-600 hover:bg-surface-100'
                            }`}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                onClick={() => onPageChange(current_page + 1)}
                disabled={current_page === last_page}
                className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}
