import React, { useState, useEffect } from 'react';
import { DocumentCheckIcon, ClockIcon, EyeIcon } from '../components/Icons';

interface CMSPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published';
    type: 'post' | 'page' | 'news';
    author: string;
    date: string;
}

const NewsPage: React.FC = () => {
    const [posts, setPosts] = useState<CMSPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<CMSPost | null>(null);
    const [filter, setFilter] = useState<'all' | 'post' | 'page' | 'news'>('all');
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

    useEffect(() => {
        // Load posts from CMS
        const savedPosts = localStorage.getItem('matcanban_cms_posts');
        if (savedPosts) {
            try {
                const allPosts = JSON.parse(savedPosts);
                // Only show published posts
                setPosts(allPosts.filter((p: CMSPost) => p.status === 'published'));
            } catch (e) {
                console.error('Error loading posts:', e);
                setPosts([]);
            }
        }
    }, []);

    const filteredPosts = filter === 'all' 
        ? posts 
        : posts.filter(post => post.type === filter);

    const PostCard: React.FC<{ post: CMSPost }> = ({ post }) => (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
             onClick={() => { setSelectedPost(post); setViewMode('detail'); }}>
            <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    post.type === 'news' ? 'bg-red-100 text-red-800' :
                    post.type === 'page' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {post.type === 'news' ? '📰 Tin tức' : 
                     post.type === 'page' ? '📄 Trang' : '📝 Bài viết'}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {post.date}
                </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                {post.title}
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    👤 {post.author}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    Đọc thêm
                </button>
            </div>
        </div>
    );

    const DetailView: React.FC<{ post: CMSPost }> = ({ post }) => (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <button 
                    onClick={() => { setViewMode('list'); setSelectedPost(null); }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Quay lại danh sách
                </button>
            </div>

            {/* Article Header */}
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            post.type === 'news' ? 'bg-red-100 text-red-800' :
                            post.type === 'page' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                            {post.type === 'news' ? '📰 Tin tức' : 
                             post.type === 'page' ? '📄 Trang' : '📝 Bài viết'}
                        </span>
                        <span className="text-sm text-gray-500">📅 {post.date}</span>
                        <span className="text-sm text-gray-500">👤 {post.author}</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
                
                {/* Article Content */}
                <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
                
                {/* Article Footer */}
                <div className="p-8 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Xuất bản ngày {post.date} bởi {post.author}
                        </div>
                        <button 
                            onClick={() => { setViewMode('list'); setSelectedPost(null); }}
                            className="btn btn-secondary"
                        >
                            ← Quay lại
                        </button>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Bài viết liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts
                        .filter(p => p.id !== post.id && p.type === post.type)
                        .slice(0, 2)
                        .map(relatedPost => (
                            <div 
                                key={relatedPost.id}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedPost(relatedPost)}
                            >
                                <h4 className="font-semibold text-gray-800 mb-2">{relatedPost.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{relatedPost.excerpt}</p>
                                <div className="text-xs text-gray-500">{relatedPost.date}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pt-8 px-4">
            {viewMode === 'detail' && selectedPost ? (
                <DetailView post={selectedPost} />
            ) : (
                <>
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4">
                            🌟 Chào Mừng Đến Với MatCanBan
                        </h1>
                        <p className="text-xl text-gray-600 mb-4">
                            Nền tảng học tiếng Anh hiện đại với AI tích hợp
                        </p>
                        <p className="text-lg text-gray-500 mb-8">
                            📰 Tin tức, bài viết và hướng dẫn mới nhất
                        </p>

                        {/* Filter Tabs */}
                        <div className="flex justify-center">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                {[
                                    { key: 'all', label: '🌟 Tất cả' },
                                    { key: 'post', label: '📝 Bài viết' },
                                    { key: 'news', label: '📰 Tin tức' },
                                    { key: 'page', label: '📄 Trang' }
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setFilter(tab.key as any)}
                                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                                            filter === tab.key
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions for Students */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                            <a href="/#/grammar" className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all">
                                <div className="text-2xl mb-2">📚</div>
                                <div className="font-semibold">Grammar Studio</div>
                                <div className="text-sm opacity-90">Luyện ngữ pháp</div>
                            </a>
                            <a href="/#/writing" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all">
                                <div className="text-2xl mb-2">✍️</div>
                                <div className="font-semibold">Writing Studio</div>
                                <div className="text-sm opacity-90">Luyện viết IELTS</div>
                            </a>
                            <a href="/#/speaking" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all">
                                <div className="text-2xl mb-2">🎤</div>
                                <div className="font-semibold">Speaking Studio</div>
                                <div className="text-sm opacity-90">Luyện nói</div>
                            </a>
                            <a href="/#/exam-hub" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all">
                                <div className="text-2xl mb-2">🎯</div>
                                <div className="font-semibold">Exam Hub</div>
                                <div className="text-sm opacity-90">Luyện thi</div>
                            </a>
                        </div>
                    </header>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <DocumentCheckIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {filter === 'all' ? 'Chưa có nội dung nào' : `Chưa có ${filter} nào`}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Nội dung sẽ được hiển thị ở đây khi được tạo từ CMS
                            </p>
                            <a 
                                href="/#/admin/cms" 
                                className="btn btn-primary"
                            >
                                🚀 Vào CMS để tạo nội dung
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}

                    {/* CMS Info */}
                    <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-2">📝 Muốn thêm nội dung?</h3>
                        <p className="mb-6">
                            Sử dụng MatCanBan CMS để tạo và quản lý nội dung website một cách dễ dàng
                        </p>
                        <a 
                            href="/#/admin/cms" 
                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                        >
                            🚀 Mở CMS
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsPage;
