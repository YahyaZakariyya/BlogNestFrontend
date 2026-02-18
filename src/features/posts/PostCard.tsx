import { Link } from 'react-router-dom';
import { Clock, MessageSquare } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate, truncate, estimateReadTime } from '@/utils';
import type { Post } from '@/types';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-md hover:border-surface-300 transition-all duration-300 group animate-fade-in">
            <Link to={`/posts/${post.id}`} className="flex flex-col sm:flex-row">
                {/* Thumbnail placeholder with gradient */}
                <div className="sm:w-56 h-40 sm:h-auto bg-gradient-to-br from-primary-100 via-primary-50 to-surface-100 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary-200 group-hover:scale-110 transition-transform duration-500">
                            {post.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                    {/* Author */}
                    <div className="flex items-center gap-2.5 mb-3">
                        <Avatar name={post.user.name} size="sm" />
                        <div>
                            <p className="text-sm font-medium text-surface-900">
                                {post.user.name}
                            </p>
                            <p className="text-xs text-surface-500">
                                {formatDate(post.created_at)}
                            </p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-surface-600 leading-relaxed mb-4 line-clamp-2">
                        {truncate(post.body, 150)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-surface-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {estimateReadTime(post.body)}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            Comments
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
