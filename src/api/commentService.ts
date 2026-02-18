import apiClient from './client';
import type {
    ApiResponse,
    Comment,
    CreateCommentData,
    PaginatedData,
    UpdateCommentData,
} from '@/types';

export const commentService = {
    async getByPost(postId: number): Promise<ApiResponse<PaginatedData<Comment>>> {
        const response = await apiClient.get<ApiResponse<PaginatedData<Comment>>>(
            `/posts/${postId}/comments`,
        );
        return response.data;
    },

    async create(data: CreateCommentData): Promise<ApiResponse<Comment>> {
        const response = await apiClient.post<ApiResponse<Comment>>(
            '/comments',
            data,
        );
        return response.data;
    },

    async update(id: number, data: UpdateCommentData): Promise<ApiResponse<Comment>> {
        const response = await apiClient.put<ApiResponse<Comment>>(
            `/comments/${id}`,
            data,
        );
        return response.data;
    },

    async delete(id: number): Promise<ApiResponse<null>> {
        const response = await apiClient.delete<ApiResponse<null>>(`/comments/${id}`);
        return response.data;
    },
};
