import React, { useState, useEffect } from 'react';
import { 
    DocumentCheckIcon as DocumentIcon, 
    PhotoIcon, 
    CheckCircleIcon as UserIcon, 
    SparklesIcon as SettingsIcon, 
    PlusCircleIcon as PlusIcon,
    BookOpenIcon as EditIcon,
    TrashIcon,
    EyeIcon
} from './Icons';

interface CMSPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published';
    type: 'post' | 'page' | 'news';
    author: string;
    date: string;
    featured_image?: string;
    seo_title?: string;
    seo_description?: string;
}

const SimpleCMS: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'media' | 'settings'>('dashboard');
    const [posts, setPosts] = useState<CMSPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPost, setEditingPost] = useState<CMSPost | null>(null);

    // Load data from localStorage
    useEffect(() => {
        const savedPosts = localStorage.getItem('matcanban_cms_posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        } else {
            // Default content
            const defaultPosts: CMSPost[] = [
                {
                    id: '1',
                    title: 'Chào mừng đến với MatCanBan',
                    content: 'MatCanBan là nền tảng học tiếng Anh hiện đại với AI tích hợp. Chúng tôi cung cấp các khóa học Grammar, Writing, Speaking và nhiều tính năng khác.',
                    excerpt: 'Nền tảng học tiếng Anh hiện đại với AI',
                    status: 'published',
                    type: 'page',
                    author: 'Admin',
                    date: new Date().toISOString().split('T')[0],
                    seo_title: 'MatCanBan - Học tiếng Anh với AI',
                    seo_description: 'Nền tảng học tiếng Anh hiện đại với AI tích hợp'
                },
                {
                    id: '2',
                    title: 'Hướng dẫn sử dụng Grammar Studio',
                    content: 'Grammar Studio là công cụ mạnh mẽ giúp bạn luyện tập ngữ pháp tiếng Anh một cách hiệu quả. Với hơn 100+ bài học được thiết kế khoa học...',
                    excerpt: 'Hướng dẫn chi tiết về Grammar Studio',
                    status: 'published',
                    type: 'post',
                    author: 'Admin',
                    date: new Date().toISOString().split('T')[0]
                },
                {
                    id: '3',
                    title: 'Writing Studio - Luyện viết IELTS, TOEIC',
                    content: 'Writing Studio cung cấp hệ thống luyện viết toàn diện cho các kỳ thi IELTS, TOEIC, VSTEP với AI feedback thông minh...',
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
    };

    const handleDeletePost = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
            const updatedPosts = posts.filter(p => p.id !== id);
            savePosts(updatedPosts);
        }
    };

    const PostEditor = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPost?.id === 'new' ? 'Thêm bài viết mới' : 'Chỉnh sửa bài viết'}
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input 
                        type="text" 
                        value={editingPost?.title || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
                        className="form-input w-full"
                        placeholder="Nhập tiêu đề bài viết..."
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt</label>
                    <input 
                        type="text" 
                        value={editingPost?.excerpt || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, excerpt: e.target.value} : null)}
                        className="form-input w-full"
                        placeholder="Tóm tắt ngắn gọn..."
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea 
                        value={editingPost?.content || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)}
                        className="form-input w-full h-40"
                        placeholder="Nhập nội dung bài viết..."
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
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                    <input 
                        type="text" 
                        value={editingPost?.seo_title || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, seo_title: e.target.value} : null)}
                        className="form-input w-full"
                        placeholder="Tiêu đề SEO (tùy chọn)..."
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                    <textarea 
                        value={editingPost?.seo_description || ''} 
                        onChange={(e) => setEditingPost(prev => prev ? {...prev, seo_description: e.target.value} : null)}
                        className="form-input w-full h-20"
                        placeholder="Mô tả SEO (tùy chọn)..."
                    />
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button 
                        onClick={() => editingPost && handleSavePost(editingPost)}
                        className="btn btn-primary flex-1"
                    >
                        {editingPost?.id === 'new' ? 'Tạo bài viết' : 'Cập nhật'}
                    </button>
                    <button 
                        onClick={() => { setIsEditing(false); setEditingPost(null); }}
                        className="btn btn-secondary flex-1"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );

    const DashboardTab = () => {
        const stats = {
            posts: posts.filter(p => p.type === 'post').length,
            pages: posts.filter(p => p.type === 'page').length,
            news: posts.filter(p => p.type === 'news').length,
            published: posts.filter(p => p.status === 'published').length
        };

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <DocumentIcon className="w-8 h-8 text-blue-600" />
                            <div className="ml-4">
                                <h3 className="text-2xl font-bold text-blue-900">{stats.posts}</h3>
                                <p className="text-blue-600">Bài viết</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <DocumentIcon className="w-8 h-8 text-green-600" />
                            <div className="ml-4">
                                <h3 className="text-2xl font-bold text-green-900">{stats.pages}</h3>
                                <p className="text-green-600">Trang</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <DocumentIcon className="w-8 h-8 text-purple-600" />
                            <div className="ml-4">
                                <h3 className="text-2xl font-bold text-purple-900">{stats.news}</h3>
                                <p className="text-purple-600">Tin tức</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-8 h-8 text-orange-600" />
                            <div className="ml-4">
                                <h3 className="text-2xl font-bold text-orange-900">{stats.published}</h3>
                                <p className="text-orange-600">Đã xuất bản</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Bài viết gần đây</h3>
                    <div className="space-y-3">
                        {posts.slice(0, 5).map(post => (
                            <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-gray-800">{post.title}</div>
                                    <div className="text-sm text-gray-600">
                                        {post.type} • {post.status} • {post.date}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => { setEditingPost(post); setIsEditing(true); }}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        <EditIcon className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">🚀 MatCanBan CMS</h3>
                    <p className="mb-4">Hệ thống quản lý nội dung tích hợp hoàn toàn với English Learning Platform</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>✅ Quản lý bài viết & trang</div>
                        <div>✅ SEO optimization</div>
                        <div>✅ Media management</div>
                        <div>✅ Real-time preview</div>
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
                        <h2 className="text-2xl font-bold text-gray-800">Quản lý nội dung</h2>
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
                            className="btn btn-primary flex items-center gap-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Thêm nội dung mới
                        </button>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.map(post => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                                <div className="text-sm text-gray-500">{post.excerpt}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">{post.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                post.status === 'published' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button 
                                                    onClick={() => { setEditingPost(post); setIsEditing(true); }}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <EditIcon className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );

    const MediaTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Thư viện Media</h2>
                <button className="btn btn-primary flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Tải lên file mới
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center py-12">
                    <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Media Library</h3>
                    <p className="text-gray-600 mb-4">Upload và quản lý hình ảnh, video cho website</p>
                    <button className="btn btn-primary">
                        Bắt đầu upload
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">☁️ Cloud Storage Integration</h3>
                <p className="text-blue-700 mb-4">Files sẽ được lưu trữ tự động trên Google Cloud Storage</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="font-semibold">Bucket:</span> matcanban-media
                    </div>
                    <div>
                        <span className="font-semibold">Region:</span> asia-southeast1
                    </div>
                    <div>
                        <span className="font-semibold">CDN:</span> Global delivery
                    </div>
                </div>
            </div>
        </div>
    );

    const SettingsTab = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Cài đặt CMS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt chung</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
                            <input type="text" defaultValue="MatCanBan" className="form-input w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea defaultValue="English Learning Platform with AI" className="form-input w-full h-20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email admin</label>
                            <input type="email" defaultValue="admin@matcanban.com" className="form-input w-full" />
                        </div>
                        <button className="btn btn-primary w-full">
                            Lưu cài đặt
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê & Export</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Tổng nội dung</div>
                            <div className="text-2xl font-bold text-gray-800">{posts.length}</div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Đã xuất bản</div>
                            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                        </div>
                        
                        <button 
                            onClick={() => {
                                const dataStr = JSON.stringify(posts, null, 2);
                                const dataBlob = new Blob([dataStr], {type:'application/json'});
                                const url = URL.createObjectURL(dataBlob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = 'matcanban-cms-export.json';
                                link.click();
                            }}
                            className="btn btn-secondary w-full"
                        >
                            Export dữ liệu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: SettingsIcon },
        { id: 'posts', name: 'Nội dung', icon: DocumentIcon },
        { id: 'media', name: 'Media', icon: PhotoIcon },
        { id: 'settings', name: 'Cài đặt', icon: SettingsIcon },
    ];

    return (
        <div className="max-w-7xl mx-auto pt-8 px-4">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                    📝 MatCanBan CMS
                </h1>
                <p className="mt-2 text-xl text-gray-600">
                    Hệ thống quản lý nội dung tích hợp
                </p>
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
                {activeTab === 'settings' && <SettingsTab />}
            </div>
        </div>
    );
};

export default SimpleCMS;

