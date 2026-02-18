import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThumbsUp, MessageSquare, Edit, Trash2, Info } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { useAuthStore } from '@/store/authStore';
import { commentSchema, type CommentFormData } from '@/utils/validation';
import { timeAgo, getErrorMessage } from '@/utils';
import type { Comment } from '@/types';

interface CommentItemProps {
    comment: Comment;
    onUpdate: (commentId: number, body: string) => Promise<Comment>;
    onDelete: (commentId: number) => Promise<void>;
}

export function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
    const { user } = useAuthStore();
    const isOwner = user?.id === comment.user.id;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: { body: comment.body },
    });

    const commentBody = watch('body');

    const handleUpdate = async (data: CommentFormData) => {
        setError(null);
        try {
            await onUpdate(comment.id, data.body);
            setIsEditModalOpen(false);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            await onDelete(comment.id);
            setIsEditModalOpen(false);
        } catch (err) {
            setError(getErrorMessage(err));
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex gap-3 animate-fade-in">
                <Avatar name={comment.user.name} size="sm" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-surface-900">
                            {comment.user.name}
                        </span>
                        <span className="text-xs text-surface-400">•</span>
                        <span className="text-xs text-surface-500">
                            {timeAgo(comment.created_at)}
                        </span>
                        {isOwner && (
                            <span className="text-xs text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded font-medium">
                                Owner
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-surface-700 mt-1 leading-relaxed">
                        {comment.body}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-xs text-surface-400 hover:text-surface-600 transition-colors">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Like
                        </button>
                        <button className="flex items-center gap-1 text-xs text-surface-400 hover:text-surface-600 transition-colors">
                            <MessageSquare className="h-3.5 w-3.5" />
                            Reply
                        </button>
                        {isOwner && (
                            <>
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="flex items-center gap-1 text-xs text-surface-400 hover:text-primary-600 transition-colors"
                                >
                                    <Edit className="h-3.5 w-3.5" />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex items-center gap-1 text-xs text-surface-400 hover:text-danger-600 transition-colors"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Comment Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Comment"
                subtitle="Refine your feedback for this post"
            >
                <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                    {error && <Alert type="error" message={error} />}

                    <Textarea
                        label="Your Comment"
                        rows={4}
                        maxChars={500}
                        charCount={commentBody?.length || 0}
                        error={errors.body?.message}
                        {...register('body')}
                    />

                    <div className="bg-surface-50 rounded-lg p-3 flex items-start gap-2.5">
                        <Info className="h-4 w-4 text-surface-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-surface-700">
                                Ownership Notice
                            </p>
                            <p className="text-xs text-surface-500 mt-0.5">
                                You are editing your own comment. The option to delete is also
                                available in the bottom left corner.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-200">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex items-center gap-1.5 text-sm font-medium text-danger-600 hover:text-danger-700 transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
