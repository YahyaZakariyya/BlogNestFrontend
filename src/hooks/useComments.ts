import { useState, useEffect, useCallback } from 'react';
import { commentService } from '@/api/commentService';
import { getErrorMessage } from '@/utils';
import type { Comment } from '@/types';

export function useComments(postId: number) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await commentService.getByPost(postId);
            // API returns paginated: data.data is the array
            setComments(response.data.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const addComment = useCallback(
        async (body: string) => {
            // API returns data directly as the Comment object
            const response = await commentService.create({ post_id: postId, body });
            setComments((prev) => [response.data, ...prev]);
            return response.data;
        },
        [postId],
    );

    const updateComment = useCallback(async (commentId: number, body: string) => {
        const response = await commentService.update(commentId, { body });
        setComments((prev) =>
            prev.map((c) => (c.id === commentId ? response.data : c)),
        );
        return response.data;
    }, []);

    const deleteComment = useCallback(async (commentId: number) => {
        await commentService.delete(commentId);
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    }, []);

    return {
        comments,
        isLoading,
        error,
        addComment,
        updateComment,
        deleteComment,
        refetch: fetchComments,
    };
}
