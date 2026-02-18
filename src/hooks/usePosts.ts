import { useState, useEffect, useCallback } from 'react';
import { postService } from '@/api/postService';
import { getErrorMessage } from '@/utils';
import type { Post, PaginationMeta } from '@/types';

export function usePosts(initialPage = 1) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (pageNum: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await postService.getAll(pageNum);
            setPosts(response.data.data);
            setMeta(response.data.meta);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

    const goToPage = useCallback((newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return {
        posts,
        meta,
        page,
        isLoading,
        error,
        goToPage,
        refetch: () => fetchPosts(page),
    };
}

export function usePost(id: number) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await postService.getById(id);
                // API returns data directly as the Post object
                setPost(response.data);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return { post, isLoading, error };
}
