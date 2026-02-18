import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/utils/validation';

export function LoginPage() {
    const { login, isLoading, error, clearError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        clearError();
        try {
            await login(data);
        } catch {
            // Error is handled by the hook
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-slide-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-surface-900">Welcome back</h1>
                    <p className="text-surface-500 mt-2">
                        Join our community of over 10,000 writers
                        <br />
                        sharing their stories with the world.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-8">
                    <h2 className="text-xl font-bold text-center text-surface-900 mb-2">
                        Sign in
                    </h2>
                    <p className="text-sm text-center text-surface-500 mb-6">
                        Enter your credentials to access your account
                    </p>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-surface-300 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Github
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-surface-300 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-surface-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-surface-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    {error && <Alert type="error" message={error} className="mb-4" />}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-surface-700">
                                    Password
                                </label>
                                <Link
                                    to="#"
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                className={`
                  w-full rounded-lg border border-surface-300 px-3.5 py-2.5
                  text-sm text-surface-900 placeholder-surface-400
                  transition-colors duration-200
                  focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                  ${errors.password ? 'border-danger-500' : ''}
                `}
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-danger-600 mt-1.5 animate-fade-in">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                        >
                            Sign in
                        </Button>
                    </form>
                </div>

                {/* Sign up link */}
                <p className="text-center text-sm text-surface-500 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-primary-600 font-medium hover:text-primary-700"
                    >
                        Sign up
                    </Link>
                </p>

                {/* Footer links */}
                <div className="flex items-center justify-center gap-4 mt-8 text-xs text-surface-400">
                    <Link to="#" className="hover:text-surface-600 transition-colors">
                        Help Center
                    </Link>
                    <span>•</span>
                    <Link to="#" className="hover:text-surface-600 transition-colors">
                        Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link to="#" className="hover:text-surface-600 transition-colors">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    );
}
