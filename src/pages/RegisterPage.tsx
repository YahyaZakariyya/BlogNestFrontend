import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/utils/validation';

export function RegisterPage() {
    const { register: registerUser, isLoading, error, clearError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        clearError();
        try {
            await registerUser(data);
        } catch {
            // Error is handled by the hook
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-slide-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-surface-900">
                        Create your account
                    </h1>
                    <p className="text-surface-500 mt-2">
                        Start sharing your stories with the world.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-8">
                    <h2 className="text-xl font-bold text-center text-surface-900 mb-2">
                        Sign up
                    </h2>
                    <p className="text-sm text-center text-surface-500 mb-6">
                        Fill in your details to get started
                    </p>

                    {/* Form */}
                    {error && <Alert type="error" message={error} className="mb-4" />}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Full name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="At least 8 characters"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Input
                            label="Confirm password"
                            type="password"
                            placeholder="Repeat your password"
                            error={errors.password_confirmation?.message}
                            {...register('password_confirmation')}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                        >
                            Create account
                        </Button>
                    </form>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-surface-500 mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-primary-600 font-medium hover:text-primary-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
