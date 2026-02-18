import { Navigate, type RouteObject } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { LoadingSpinner } from '@/components/ui/Loading';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * ProtectedRoute — wraps pages that require authentication.
 * Redirects to /login if the user is not authenticated.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

/**
 * GuestRoute — wraps pages that should ONLY be visible to guests.
 * Redirects to /feed if the user is already authenticated.
 */
export function GuestRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/feed" replace />;
    }

    return <>{children}</>;
}

// Lazy-loaded page imports
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { FeedPage } from '@/pages/FeedPage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'login',
                element: (
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                ),
            },
            {
                path: 'register',
                element: (
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                ),
            },
            {
                path: 'feed',
                element: <FeedPage />,
            },
            {
                path: 'posts/:id',
                element: <PostDetailPage />,
            },
            {
                path: 'create-post',
                element: (
                    <ProtectedRoute>
                        <CreatePostPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
