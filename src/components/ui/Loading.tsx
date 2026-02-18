export function LoadingSpinner({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center py-12 ${className}`}>
            <div className="h-8 w-8 rounded-full border-3 border-surface-200 border-t-primary-600 animate-spin" />
        </div>
    );
}

export function PostCardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-surface-200 overflow-hidden animate-fade-in">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-56 h-40 sm:h-auto animate-shimmer shrink-0" />
                <div className="flex-1 p-5 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full animate-shimmer" />
                        <div className="space-y-1">
                            <div className="h-3 w-24 rounded animate-shimmer" />
                            <div className="h-2.5 w-16 rounded animate-shimmer" />
                        </div>
                    </div>
                    <div className="h-5 w-3/4 rounded animate-shimmer" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-full rounded animate-shimmer" />
                        <div className="h-3 w-5/6 rounded animate-shimmer" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-full animate-shimmer" />
                        <div className="h-6 w-20 rounded-full animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PostDetailSkeleton() {
    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="space-y-4">
                <div className="h-8 w-3/4 rounded animate-shimmer" />
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full animate-shimmer" />
                    <div className="space-y-1">
                        <div className="h-3 w-28 rounded animate-shimmer" />
                        <div className="h-2.5 w-20 rounded animate-shimmer" />
                    </div>
                </div>
            </div>
            <div className="h-64 rounded-xl animate-shimmer" />
            <div className="space-y-3">
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-5/6 rounded animate-shimmer" />
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-3/4 rounded animate-shimmer" />
            </div>
        </div>
    );
}
