import apiClient from './client';
import type {
    ApiResponse,
    CreatePostData,
    PaginatedData,
    Post,
} from '@/types';

export const postService = {
    async getAll(page = 1, perPage = 10): Promise<ApiResponse<PaginatedData<Post>>> {
        const response = await apiClient.get<ApiResponse<PaginatedData<Post>>>('/posts', {
            params: { page, per_page: perPage },
        });
        return response.data;
    },

    async getById(id: number): Promise<ApiResponse<Post>> {
        const response = await apiClient.get<ApiResponse<Post>>(`/posts/${id}`);
        return response.data;
    },

    async create(data: CreatePostData): Promise<ApiResponse<Post>> {
        const response = await apiClient.post<ApiResponse<Post>>('/posts', data);
        return response.data;
    },

    async delete(id: number): Promise<ApiResponse<null>> {
        const response = await apiClient.delete<ApiResponse<null>>(`/posts/${id}`);
        return response.data;
    },
};
