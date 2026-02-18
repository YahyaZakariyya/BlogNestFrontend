import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/authService';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/utils';
import type { LoginCredentials, RegisterCredentials } from '@/types';

export function useAuth() {
    const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await authService.login(credentials);
                setAuth(response.data.user, response.data.token);
                navigate('/feed');
            } catch (err) {
                const message = getErrorMessage(err);
                setError(message);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [navigate, setAuth],
    );

    const register = useCallback(
        async (credentials: RegisterCredentials) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await authService.register(credentials);
                setAuth(response.data.user, response.data.token);
                navigate('/feed');
            } catch (err) {
                const message = getErrorMessage(err);
                setError(message);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [navigate, setAuth],
    );

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Even if the API call fails, clear local state
        } finally {
            clearAuth();
            navigate('/login');
        }
    }, [clearAuth, navigate]);

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError: () => setError(null),
    };
}
