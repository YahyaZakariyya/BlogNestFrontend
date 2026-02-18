import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Clock, MessageSquare, Share2, ChevronRight, ThumbsUp } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { PostDetailSkeleton } from '@/components/ui/Loading';
import { CommentSection } from '@/features/comments/CommentSection';
import { usePost } from '@/hooks/usePosts';
import { useAuthStore } from '@/store/authStore';
import { postService } from '@/api/postService';
import { formatDate, estimateReadTime, getErrorMessage } from '@/utils';

export function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { post, isLoading, error } = usePost(Number(id));
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const isOwner = user?.id === post?.user.id;

    const handleDelete = async () => {
        if (!post) return;
        if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);
        try {
            await postService.delete(post.id);
            navigate('/feed');
        } catch (err) {
            setDeleteError(getErrorMessage(err));
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <PostDetailSkeleton />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-surface-900 mb-2">
                    Post not found
                </h2>
                <p className="text-surface-500 mb-6">{error || 'This post doesn\'t exist or has been deleted.'}</p>
                <Link to="/feed">
                    <Button variant="secondary">Back to Feed</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-surface-500 mb-6">
                <Link to="/" className="hover:text-primary-600 transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link to="/feed" className="hover:text-primary-600 transition-colors">
                    Feed
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-surface-900 font-medium truncate max-w-[200px]">
                    Post Detail
                </span>
            </nav>

            <article className="animate-fade-in">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Author + Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Avatar name={post.user.name} size="lg" />
                        <div>
                            <p className="font-semibold text-surface-900">{post.user.name}</p>
                            <div className="flex items-center gap-3 text-sm text-surface-500">
                                <span>{formatDate(post.created_at)}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {estimateReadTime(post.body)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-2">
                            <Link
                                to="#"
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 text-surface-600 hover:text-surface-900 hover:bg-surface-100 px-3 py-1.5 text-sm"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDelete}
                                isLoading={isDeleting}
                                className="text-danger-600 hover:text-danger-700 hover:bg-danger-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {deleteError && <Alert type="error" message={deleteError} className="mb-6" />}

                {/* Cover image placeholder */}
                <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-primary-100 via-primary-50 to-surface-100 rounded-xl mb-8 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary-200">
                        {post.title.charAt(0).toUpperCase()}
                    </span>
                </div>

                {/* Body */}
                <div className="prose prose-surface max-w-none mb-8">
                    {post.body.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="text-surface-700 leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Engagement bar */}
                <div className="flex items-center justify-between py-4 border-t border-b border-surface-200 mb-8">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-primary-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            Like
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-primary-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            Comment
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-surface-500">Share this article:</span>
                        <button className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
                            <Share2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Author card */}
                <div className="bg-surface-50 rounded-xl p-6 flex items-start gap-4 mb-10 border border-surface-200">
                    <Avatar name={post.user.name} size="lg" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-surface-900">
                                    Written by {post.user.name}
                                </p>
                                <p className="text-sm text-surface-500 mt-0.5">
                                    Community member
                                </p>
                            </div>
                            <Button variant="secondary" size="sm">
                                Follow
                            </Button>
                        </div>
                        <p className="text-sm text-surface-600 mt-2">
                            Passionate about sharing knowledge and building scalable, API-driven
                            infrastructures.
                        </p>
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection postId={post.id} />
            </article>
        </div>
    );
}
