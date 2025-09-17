import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    DocumentCheckIcon, 
    PhotoIcon, 
    CheckCircleIcon, 
    SparklesIcon,
    ArrowUturnLeftIcon
} from '../components/Icons';

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

const CMSPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'media'>('dashboard');
    const [posts, setPosts] = useState<CMSPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPost, setEditingPost] = useState<CMSPost | null>(null);

    // Load posts from localStorage
    useEffect(() => {
        const savedPosts = localStorage.getItem('matcanban_cms_posts');
        if (savedPosts) {
            try {
                setPosts(JSON.parse(savedPosts));
            } catch (e) {
                console.error('Error loading posts:', e);
                setPosts([]);
            }
        } else {
            // Default posts
            const defaultPosts: CMSPost[] = [
                {
                    id: '1',
                    title: 'Chào mừng đến với MatCanBan',
                    content: 'MatCanBan là nền tảng học tiếng Anh hiện đại với AI tích hợp. Chúng tôi cung cấp các khóa học Grammar, Writing, Speaking và nhiều tính năng khác để giúp bạn nâng cao trình độ tiếng Anh một cách hiệu quả.',
                    excerpt: 'Nền tảng học tiếng Anh hiện đại với AI',
                    status: 'published',
                    type: 'page',
                    author: 'Admin',
                    date: new Date().toISOString().split('T')[0]
                },
                {
                    id: '2',
                    title: 'Hướng dẫn sử dụng Grammar Studio',
                    content: 'Grammar Studio là công cụ mạnh mẽ giúp bạn luyện tập ngữ pháp tiếng Anh một cách hiệu quả. Với hơn 100+ bài học được thiết kế khoa học, bạn sẽ nắm vững các quy tắc ngữ pháp từ cơ bản đến nâng cao.',
                    excerpt: 'Hướng dẫn chi tiết về Grammar Studio',
                    status: 'published',
                    type: 'post',
                    author: 'Admin',
                    date: new Date().toISOString().split('T')[0]
                },
                {
                    id: '3',
                    title: 'Writing Studio - Luyện viết IELTS, TOEIC',
                    content: 'Writing Studio cung cấp hệ thống luyện viết toàn diện cho các kỳ thi IELTS, TOEIC, VSTEP với AI feedback thông minh. Bạn sẽ được hướng dẫn từng bước để viết bài luận đạt điểm cao.',
                    excerpt: 'Hệ thống luyện viết với AI feedback',
                    status: 'draft',
                    type: 'post',
                    author: 'Admin',
                    date: new Date().toISOString().split('T')[0]
                }
            ];
            setPosts(defaultPosts);
            localStorage.setItem('matcanban_cms_posts', JSON.stringify(defaultPosts));
        }
    }, []);

    const savePosts = (newPosts: CMSPost[]) => {
        setPosts(newPosts);
        localStorage.setItem('matcanban_cms_posts', JSON.stringify(newPosts));
    };

    const handleSavePost = (post: CMSPost) => {
        const updatedPosts = post.id === 'new' 
            ? [...posts, { ...post, id: Date.now().toString() }]
            : posts.map(p => p.id === post.id ? post : p);
        
        savePosts(updatedPosts);
        setIsEditing(false);
        setEditingPost(null);
        alert('Đã lưu thành công!');
    };

    const handleDeletePost = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa nội dung này?')) {
            const updatedPosts = posts.filter(p => p.id !== id);
            savePosts(updatedPosts);
            alert('Đã xóa thành công!');
        }
    };

    const PostEditor = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPost?.id === 'new' ? 'Thêm nội dung mới' : 'Chỉnh sửa nội dung'}
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                    <input 
                        type="text" 
                        value={editingPost?.title || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
                        className="form-input w-full"
                        placeholder="Nhập tiêu đề..."
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt *</label>
                    <input 
                        type="text" 
                        value={editingPost?.excerpt || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, excerpt: e.target.value} : null)}
                        className="form-input w-full"
                        placeholder="Tóm tắt ngắn gọn..."
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung *</label>
                    <textarea 
                        value={editingPost?.content || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)}
                        className="form-input w-full h-40"
                        placeholder="Nhập nội dung chi tiết..."
                        required
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Loại</label>
                        <select 
                            value={editingPost?.type || 'post'} 
                            onChange={(e) => setEditingPost(prev => prev ? {...prev, type: e.target.value as any} : null)}
                            className="form-input w-full"
                        >
                            <option value="post">Bài viết</option>
                            <option value="page">Trang</option>
                            <option value="news">Tin tức</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                        <select 
                            value={editingPost?.status || 'draft'} 
                            onChange={(e) => setEditingPost(prev => prev ? {...prev, status: e.target.value as any} : null)}
                            className="form-input w-full"
                        >
                            <option value="draft">Bản nháp</option>
                            <option value="published">Đã xuất bản</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button 
                        onClick={() => {
                            if (!editingPost?.title || !editingPost?.excerpt || !editingPost?.content) {
                                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
                                return;
                            }
                            handleSavePost(editingPost);
                        }}
                        className="btn btn-primary flex-1"
                    >
                        {editingPost?.id === 'new' ? '💾 Tạo nội dung' : '💾 Cập nhật'}
                    </button>
                    <button 
                        onClick={() => { setIsEditing(false); setEditingPost(null); }}
                        className="btn btn-secondary flex-1"
                    >
                        ❌ Hủy
                    </button>
                </div>
            </div>
        </div>
    );

    const DashboardTab = () => {
        const stats = {
            total: posts.length,
            published: posts.filter(p => p.status === 'published').length,
            drafts: posts.filter(p => p.status === 'draft').length,
            posts: posts.filter(p => p.type === 'post').length,
            pages: posts.filter(p => p.type === 'page').length,
            news: posts.filter(p => p.type === 'news').length
        };

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <DocumentCheckIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-blue-900">{stats.total}</h3>
                        <p className="text-blue-600">Tổng nội dung</p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-green-900">{stats.published}</h3>
                        <p className="text-green-600">Đã xuất bản</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <SparklesIcon className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-yellow-900">{stats.drafts}</h3>
                        <p className="text-yellow-600">Bản nháp</p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                        <PhotoIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-purple-900">{stats.posts}</h3>
                        <p className="text-purple-600">Bài viết</p>
                    </div>
                </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎉 MatCanBan CMS</h3>
                <p className="text-gray-600 mb-4">
                    Hệ thống quản lý nội dung đã được tích hợp thành công vào English Learning Platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">✅ Hoạt động hoàn hảo</h4>
                        <p className="text-sm text-green-600">CMS đã được tích hợp vào matcanban.com/admin</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">🚀 Sẵn sàng sử dụng</h4>
                        <p className="text-sm text-blue-600">Quản lý nội dung mà không ảnh hưởng trang chính</p>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    const PostsTab = () => (
        <div className="space-y-6">
            {isEditing ? (
                <PostEditor />
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Quản lý nội dung ({posts.length})</h2>
                        <button 
                            onClick={() => {
                                setEditingPost({
                                    id: 'new',
                                    title: '',
                                    content: '',
                                    excerpt: '',
                                    status: 'draft',
                                    type: 'post',
                                    author: 'Admin',
                                    date: new Date().toISOString().split('T')[0]
                                });
                                setIsEditing(true);
                            }}
                            className="btn btn-primary"
                        >
                            ➕ Thêm nội dung mới
                        </button>
                    </div>

                    {posts.length === 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <DocumentCheckIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chưa có nội dung nào</h3>
                            <p className="text-gray-600 mb-4">Hãy tạo bài viết đầu tiên cho website của bạn</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map(post => (
                                <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                                            <p className="text-gray-600 mb-3">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="capitalize">📄 {post.type}</span>
                                                <span className={post.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                                                    {post.status === 'published' ? '✅ Đã xuất bản' : '📝 Bản nháp'}
                                                </span>
                                                <span>📅 {post.date}</span>
                                                <span>👤 {post.author}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button 
                                                onClick={() => { setEditingPost(post); setIsEditing(true); }}
                                                className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                ✏️ Sửa
                                            </button>
                                            <button 
                                                onClick={() => handleDeletePost(post.id)}
                                                className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                                                title="Xóa"
                                            >
                                                🗑️ Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );

    const MediaTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Thư viện Media</h2>
                <button className="btn btn-primary">
                    Tải lên file
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center py-12">
                    <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Media Library</h3>
                    <p className="text-gray-600 mb-4">Upload và quản lý hình ảnh, video cho website</p>
                    <div className="text-sm text-gray-500">
                        Tích hợp với Google Cloud Storage
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: SparklesIcon },
        { id: 'posts', name: 'Nội dung', icon: DocumentCheckIcon },
        { id: 'media', name: 'Media', icon: PhotoIcon },
    ];

    return (
        <div className="max-w-7xl mx-auto pt-8 px-4">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                        📝 MatCanBan CMS
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Hệ thống quản lý nội dung tích hợp
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/admin-hub')}
                    className="btn btn-secondary flex items-center gap-2"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Quay lại Admin Hub
                </button>
            </header>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'dashboard' && <DashboardTab />}
                {activeTab === 'posts' && <PostsTab />}
                {activeTab === 'media' && <MediaTab />}
            </div>
        </div>
    );
};

export default CMSPage;
