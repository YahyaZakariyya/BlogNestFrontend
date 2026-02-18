import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-white border-t border-surface-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-500">
                        © {new Date().getFullYear()} BlogNest. All rights reserved.
                    </p>
                    <nav className="flex items-center gap-6">
                        <Link
                            to="#"
                            className="text-sm text-surface-500 hover:text-surface-700 transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            to="#"
                            className="text-sm text-surface-500 hover:text-surface-700 transition-colors"
                        >
                            Privacy
                        </Link>
                        <a
                            href="http://127.0.0.1:8001/api/documentation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-surface-500 hover:text-surface-700 transition-colors"
                        >
                            API Docs
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
