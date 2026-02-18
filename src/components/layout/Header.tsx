import { Link, useNavigate } from 'react-router-dom';
import { Search, PenSquare, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function Header() {
    const { user, isAuthenticated, clearAuth } = useAuthStore();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = async () => {
        clearAuth();
        navigate('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/feed?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                                <span className="text-white font-bold text-sm">B</span>
                            </div>
                            <span className="text-lg font-bold text-surface-900 hidden sm:block">
                                BlogNest
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                to="/"
                                className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/feed"
                                className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-colors"
                            >
                                Feed
                            </Link>
                        </nav>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="hidden sm:block flex-1 max-w-md mx-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-surface-100 border border-transparent rounded-lg text-sm
                  placeholder-surface-400 focus:bg-white focus:border-surface-300 focus:outline-none
                  transition-all duration-200"
                            />
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link to="/create-post">
                                    <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
                                        <PenSquare className="h-4 w-4" />
                                        Create Post
                                    </Button>
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-100 transition-colors">
                                        <Avatar name={user?.name || 'User'} size="sm" />
                                    </button>
                                    {/* Dropdown */}
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-surface-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="px-3 py-2 border-b border-surface-100">
                                            <p className="text-sm font-medium text-surface-900 truncate">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs text-surface-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/create-post"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50 sm:hidden"
                                        >
                                            <PenSquare className="h-4 w-4" />
                                            Create Post
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                        <LogIn className="h-4 w-4" />
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">
                                        <UserPlus className="h-4 w-4" />
                                        Sign up
                                    </Button>
                                </Link>
                            </>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-surface-200 py-3 animate-fade-in">
                        <form onSubmit={handleSearch} className="mb-3 sm:hidden">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-surface-100 border border-transparent rounded-lg text-sm
                    placeholder-surface-400 focus:bg-white focus:border-surface-300 focus:outline-none"
                                />
                            </div>
                        </form>
                        <nav className="space-y-1">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100"
                            >
                                Home
                            </Link>
                            <Link
                                to="/feed"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100"
                            >
                                Feed
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
