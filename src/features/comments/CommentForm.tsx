import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAuthStore } from '@/store/authStore';
import { commentSchema, type CommentFormData } from '@/utils/validation';
import { getErrorMessage } from '@/utils';
import type { Comment } from '@/types';

interface CommentFormProps {
    onSubmit: (body: string) => Promise<Comment>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
    const { user, isAuthenticated } = useAuthStore();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
    });

    const handleFormSubmit = async (data: CommentFormData) => {
        setError(null);
        try {
            await onSubmit(data.body);
            reset();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-surface-50 rounded-xl p-5 text-center">
                <p className="text-sm text-surface-500">
                    <a href="/login" className="text-primary-600 font-medium hover:underline">
                        Sign in
                    </a>{' '}
                    to join the conversation.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
            {error && <Alert type="error" message={error} />}

            <div className="flex items-start gap-3">
                <Avatar name={user?.name || 'User'} size="sm" className="mt-1" />
                <div className="flex-1">
                    <textarea
                        placeholder="Join the conversation..."
                        rows={3}
                        className={`
              w-full rounded-lg border border-surface-300 px-3.5 py-2.5
              text-sm text-surface-900 placeholder-surface-400
              transition-colors duration-200 resize-none
              focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
              ${errors.body ? 'border-danger-500' : ''}
            `}
                        {...register('body')}
                    />
                    {errors.body && (
                        <p className="text-sm text-danger-600 mt-1">{errors.body.message}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
                <Button type="submit" size="sm" isLoading={isSubmitting}>
                    Post Comment
                </Button>
            </div>
        </form>
    );
}
