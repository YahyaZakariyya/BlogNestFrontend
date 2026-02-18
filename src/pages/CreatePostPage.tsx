import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { postService } from '@/api/postService';
import { createPostSchema, type CreatePostFormData } from '@/utils/validation';
import { getErrorMessage } from '@/utils';

export function CreatePostPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
    });

    const body = watch('body') || '';

    const onSubmit = async (data: CreatePostFormData) => {
        setError(null);
        try {
            const response = await postService.create(data);
            navigate(`/posts/${response.data.id}`);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Create New Post</h1>
                    <p className="text-sm text-surface-500 mt-0.5">
                        Share your knowledge with the community
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 sm:p-8 animate-fade-in">
                {error && <Alert type="error" message={error} className="mb-6" />}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Post title"
                        placeholder="Enter a compelling title for your post..."
                        error={errors.title?.message}
                        {...register('title')}
                    />

                    <Textarea
                        label="Content"
                        placeholder="Write your post content here. Share your ideas, knowledge, and stories..."
                        rows={12}
                        error={errors.body?.message}
                        {...register('body')}
                    />

                    {/* Preview */}
                    {body.length > 0 && (
                        <div className="bg-surface-50 rounded-xl p-5 border border-surface-200">
                            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
                                Preview
                            </h3>
                            <div className="prose prose-sm max-w-none">
                                {body.split('\n').map((line, idx) => (
                                    <p key={idx} className="text-surface-700 text-sm leading-relaxed">
                                        {line || '\u00A0'}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                        <p className="text-xs text-surface-400">
                            {body.split(/\s+/).filter(Boolean).length} words
                        </p>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting}>
                                <Send className="h-4 w-4" />
                                Publish Post
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
