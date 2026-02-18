import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { LoadingSpinner } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';
import { useComments } from '@/hooks/useComments';

interface CommentSectionProps {
    postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
    const { comments, isLoading, error, addComment, updateComment, deleteComment } =
        useComments(postId);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-surface-900">
                    Discussion{' '}
                    <span className="text-surface-400 font-normal text-base">
                        {comments.length}
                    </span>
                </h2>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                    Sort by:{' '}
                    <button className="font-semibold text-surface-900 hover:text-primary-600 transition-colors">
                        Best
                    </button>
                </div>
            </div>

            {/* Comment form */}
            <CommentForm onSubmit={addComment} />

            {/* Comments list */}
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <Alert type="error" message={error} />
            ) : comments.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-surface-500 text-sm">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onUpdate={updateComment}
                            onDelete={deleteComment}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
