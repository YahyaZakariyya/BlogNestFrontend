import { Link } from 'react-router-dom';
import { PenSquare, Sparkles, TrendingUp } from 'lucide-react';
import { PostCard } from '@/features/posts/PostCard';
import { PostCardSkeleton } from '@/components/ui/Loading';
import { Pagination } from '@/components/ui/Pagination';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { usePosts } from '@/hooks/usePosts';
import { useAuthStore } from '@/store/authStore';

export function FeedPage() {
    const { posts, meta, isLoading, error, goToPage } = usePosts();
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-52 shrink-0">
                    <nav className="space-y-1 sticky top-24">
                        <a
                            href="#"
                            className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-surface-900 bg-surface-100 rounded-lg"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                            </svg>
                            All Posts
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-surface-500 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors"
                        >
                            <TrendingUp className="h-4 w-4" />
                            Trending
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-surface-500 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors"
                        >
                            <Sparkles className="h-4 w-4" />
                            Latest Feed
                        </a>

                        <div className="pt-6">
                            <h3 className="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">
                                Popular Tags
                            </h3>
                            {['#technology', '#design', '#programming', '#lifestyle'].map(
                                (tag) => (
                                    <a
                                        key={tag}
                                        href="#"
                                        className="block px-3 py-1.5 text-sm text-surface-500 hover:text-primary-600 transition-colors"
                                    >
                                        {tag}
                                    </a>
                                ),
                            )}
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-surface-900">Main Feed</h1>
                            <p className="text-surface-500 text-sm mt-1">
                                Discover the latest stories from our global community.
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-sm">
                            <button className="flex items-center gap-1.5 text-surface-500 hover:text-surface-700 transition-colors">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                                </svg>
                                Filter
                            </button>
                            <span className="text-surface-300">|</span>
                            <button className="text-primary-600 font-medium">
                                Newest First
                            </button>
                        </div>
                    </div>

                    {error && <Alert type="error" message={error} className="mb-6" />}

                    {/* Post List */}
                    <div className="space-y-4">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <PostCardSkeleton key={i} />
                            ))
                            : posts.map((post) => <PostCard key={post.id} post={post} />)}
                    </div>

                    {/* Empty State */}
                    {!isLoading && !error && posts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="h-16 w-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PenSquare className="h-7 w-7 text-surface-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-surface-900 mb-2">
                                No posts yet
                            </h3>
                            <p className="text-surface-500 text-sm mb-6">
                                Be the first to share something with the community!
                            </p>
                            {isAuthenticated && (
                                <Link to="/create-post">
                                    <Button>
                                        <PenSquare className="h-4 w-4" />
                                        Write a Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {meta && meta.last_page > 1 && (
                        <div className="mt-8">
                            <Pagination meta={meta} onPageChange={goToPage} />
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="hidden xl:block w-72 shrink-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Share CTA */}
                        {isAuthenticated && (
                            <div className="bg-white rounded-xl border border-surface-200 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="h-4 w-4 text-primary-600" />
                                    <h3 className="font-semibold text-surface-900">
                                        Share your thoughts
                                    </h3>
                                </div>
                                <p className="text-sm text-surface-500 mb-4">
                                    Ready to contribute to the community? Write your next amazing
                                    blog post today.
                                </p>
                                <Link to="/create-post">
                                    <Button fullWidth variant="primary">
                                        Create New Post
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Trending */}
                        <div className="bg-white rounded-xl border border-surface-200 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="h-4 w-4 text-primary-600" />
                                <h3 className="font-semibold text-surface-900">
                                    Trending Now
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { category: 'CODING', title: '10 CSS Tricks You Didn\'t Know', color: 'text-primary-600' },
                                    { category: 'DEVOPS', title: 'Why We Switched to Bun', color: 'text-emerald-600' },
                                    { category: 'FRONTEND', title: 'State Management in 2024', color: 'text-violet-600' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <span className="text-lg font-bold text-surface-300">{`0${idx + 1}`}</span>
                                        <div>
                                            <span className={`text-xs font-bold ${item.color} uppercase`}>
                                                {item.category}
                                            </span>
                                            <p className="text-sm font-medium text-surface-900 mt-0.5 leading-tight">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="#"
                                className="flex items-center gap-1 text-sm text-surface-500 hover:text-primary-600 mt-4 transition-colors"
                            >
                                View All Trending
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </a>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl border border-primary-200 p-5 text-center">
                            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="h-5 w-5 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-surface-900 mb-1">
                                Weekly Newsletter
                            </h3>
                            <p className="text-xs text-surface-500 mb-4">
                                Get the best articles delivered to your inbox every Sunday morning.
                            </p>
                            <Button variant="secondary" size="sm" fullWidth>
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
