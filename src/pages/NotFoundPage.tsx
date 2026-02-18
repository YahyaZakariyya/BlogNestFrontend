import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="text-center animate-slide-up">
                <p className="text-8xl font-extrabold text-primary-600 mb-4">404</p>
                <h1 className="text-2xl font-bold text-surface-900 mb-2">
                    Page not found
                </h1>
                <p className="text-surface-500 mb-8 max-w-sm mx-auto">
                    Sorry, we couldn't find the page you're looking for. It may have been
                    moved or deleted.
                </p>
                <Link to="/">
                    <Button>
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
