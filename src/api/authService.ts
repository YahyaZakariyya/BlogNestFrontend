import apiClient from './client';
import type {
    ApiResponse,
    AuthData,
    LoginCredentials,
    RegisterCredentials,
} from '@/types';

export const authService = {
    async register(data: RegisterCredentials): Promise<ApiResponse<AuthData>> {
        const response = await apiClient.post<ApiResponse<AuthData>>('/register', data);
        return response.data;
    },

    async login(data: LoginCredentials): Promise<ApiResponse<AuthData>> {
        const response = await apiClient.post<ApiResponse<AuthData>>('/login', data);
        return response.data;
    },

    async logout(): Promise<ApiResponse<null>> {
        const response = await apiClient.post<ApiResponse<null>>('/logout');
        return response.data;
    },
};
