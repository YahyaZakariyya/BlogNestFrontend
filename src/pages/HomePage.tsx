import { Link } from 'react-router-dom';
import { ArrowRight, PenSquare, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export function HomePage() {
    const { isAuthenticated } = useAuthStore();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight animate-fade-in">
                        Share your stories
                        <br />
                        <span className="text-primary-200">with the world</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
                        Join our community of writers sharing their ideas, knowledge, and
                        stories. Discover content that inspires and educates.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                        <Link to="/feed">
                            <Button size="lg" variant="secondary" className="!bg-white !text-primary-700 hover:!bg-primary-50 shadow-lg shadow-primary-900/20 !border-white/20">
                                <BookOpen className="h-5 w-5" />
                                Explore Posts
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        {!isAuthenticated && (
                            <Link to="/register">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="text-white border border-white/30 hover:bg-white/10"
                                >
                                    <PenSquare className="h-5 w-5" />
                                    Start Writing
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-surface-900">
                        Why BlogNest?
                    </h2>
                    <p className="mt-3 text-surface-500 max-w-lg mx-auto">
                        Everything you need to write, share, and engage with a global
                        community of readers and writers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: PenSquare,
                            title: 'Write & Publish',
                            desc: 'Create beautifully formatted posts with our clean editor. Share your expertise with the world in seconds.',
                            gradient: 'from-primary-500 to-blue-600',
                        },
                        {
                            icon: BookOpen,
                            title: 'Discover Content',
                            desc: 'Browse posts from talented writers across diverse topics. Filter, search, and find exactly what inspires you.',
                            gradient: 'from-violet-500 to-purple-600',
                        },
                        {
                            icon: Shield,
                            title: 'Own Your Content',
                            desc: 'Full ownership of your posts and comments. Edit or delete anytime. Your voice, your rules.',
                            gradient: 'from-emerald-500 to-green-600',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="group bg-white rounded-2xl border border-surface-200 p-8 hover:shadow-xl hover:border-surface-300 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-surface-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-surface-500 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-surface-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to share your story?
                    </h2>
                    <p className="text-surface-400 mb-8 max-w-lg mx-auto">
                        Join thousands of writers who are already sharing their knowledge
                        and stories with a global audience.
                    </p>
                    <Link to={isAuthenticated ? '/create-post' : '/register'}>
                        <Button size="lg">
                            {isAuthenticated ? 'Write Your First Post' : 'Get Started for Free'}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
