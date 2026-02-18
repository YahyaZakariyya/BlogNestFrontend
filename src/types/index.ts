// ==========================================
// Domain Types
// ==========================================

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    user: Pick<User, 'id' | 'name'>;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    body: string;
    user: Pick<User, 'id' | 'name'>;
    created_at: string;
    updated_at: string;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PaginatedData<T> {
    data: T[];
    meta: PaginationMeta;
}

// ==========================================
// Auth Types
// ==========================================

export interface AuthData {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// ==========================================
// Form Types
// ==========================================

export interface CreatePostData {
    title: string;
    body: string;
}

export interface CreateCommentData {
    post_id: number;
    body: string;
}

export interface UpdateCommentData {
    body: string;
}
