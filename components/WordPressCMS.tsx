import React, { useState, useEffect } from 'react';
import { 
    DocumentCheckIcon as DocumentTextIcon, 
    PhotoIcon, 
    CheckCircleIcon as UserGroupIcon, 
    SparklesIcon as CogIcon, 
    PlusCircleIcon as PlusIcon,
    BookOpenIcon as PencilIcon,
    TrashIcon,
    EyeIcon
} from './Icons';

interface CMSPost {
    id: number;
    title: string;
    content: string;
    status: 'draft' | 'published';
    type: 'post' | 'page' | 'product';
    author: string;
    date: string;
    featured_image?: string;
}

interface CMSStats {
    posts: number;
    pages: number;
    products: number;
    users: number;
}

const WordPressCMS: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'media' | 'settings'>('dashboard');
    const [posts, setPosts] = useState<CMSPost[]>([]);
    const [stats, setStats] = useState<CMSStats>({ posts: 0, pages: 0, products: 0, users: 0 });
    const [loading, setLoading] = useState(false);

    // Mock data for demo
    useEffect(() => {
        const mockPosts: CMSPost[] = [
            {
                id: 1,
                title: 'Chào mừng đến với MatCanBan CMS',
                content: 'Đây là bài viết đầu tiên trong hệ thống CMS mới...',
                status: 'published',
                type: 'post',
                author: 'Admin',
                date: '2025-09-16',
                featured_image: '/api/placeholder/300/200'
            },
            {
                id: 2,
                title: 'Hướng dẫn sử dụng English Learning Platform',
                content: 'Bài viết hướng dẫn chi tiết về cách sử dụng platform...',
                status: 'draft',
                type: 'post',
                author: 'Admin',
                date: '2025-09-16'
            },
            {
                id: 3,
                title: 'Về chúng tôi',
                content: 'Trang giới thiệu về MatCanBan...',
                status: 'published',
                type: 'page',
                author: 'Admin',
                date: '2025-09-16'
            }
        ];
        
        setPosts(mockPosts);
        setStats({
            posts: mockPosts.filter(p => p.type === 'post').length,
            pages: mockPosts.filter(p => p.type === 'page').length,
            products: mockPosts.filter(p => p.type === 'product').length,
            users: 5
        });
    }, []);

    const DashboardTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold text-blue-900">{stats.posts}</h3>
                            <p className="text-blue-600">Bài viết</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <DocumentTextIcon className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold text-green-900">{stats.pages}</h3>
                            <p className="text-green-600">Trang</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <PhotoIcon className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold text-purple-900">{stats.products}</h3>
                            <p className="text-purple-600">Sản phẩm</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <UserGroupIcon className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold text-orange-900">{stats.users}</h3>
                            <p className="text-orange-600">Người dùng</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Bài viết "Chào mừng đến với MatCanBan CMS" đã được xuất bản</span>
                        <span className="text-xs text-gray-400">2 giờ trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Trang "Về chúng tôi" đã được cập nhật</span>
                        <span className="text-xs text-gray-400">1 ngày trước</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">5 người dùng mới đăng ký</span>
                        <span className="text-xs text-gray-400">3 ngày trước</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">🚀 WordPress CMS Integration</h3>
                <p className="mb-4">Quản lý nội dung website với WordPress CMS mạnh mẽ</p>
                <div className="flex gap-4">
                    <a 
                        href="https://matcanban-wordpress-rhcjwiv3qa-as.a.run.app/wp-admin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Mở WordPress Admin
                    </a>
                    <a 
                        href="https://matcanban-wordpress-rhcjwiv3qa-as.a.run.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    >
                        Xem WordPress Site
                    </a>
                </div>
            </div>
        </div>
    );

    const PostsTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý bài viết</h2>
                <button className="btn btn-primary flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Thêm bài viết mới
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tác giả</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map(post => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {post.featured_image && (
                                            <img src={post.featured_image} alt="" className="w-10 h-10 rounded object-cover mr-3" />
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                            <div className="text-sm text-gray-500">{post.content.substring(0, 50)}...</div>
                                        </div>
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
                                <td className="px-6 py-4 text-sm text-gray-500">{post.author}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <EyeIcon className="w-4 h-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1,2,3,4,5,6,7,8].map(i => (
                        <div key={i} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <PhotoIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="flex gap-2">
                                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button className="bg-white text-red-600 p-2 rounded-full hover:bg-gray-100">
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">☁️ Cloud Storage Integration</h3>
                <p className="text-blue-700 mb-4">Files được lưu trữ tự động trên Google Cloud Storage</p>
                <div className="flex gap-4">
                    <div className="text-sm">
                        <span className="font-semibold">Bucket:</span> matcanban-media
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold">Region:</span> asia-southeast1
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold">CDN:</span> Enabled
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
                            <textarea defaultValue="English Learning Platform" className="form-input w-full h-20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email admin</label>
                            <input type="email" defaultValue="admin@matcanban.com" className="form-input w-full" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">WordPress Integration</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                                <div className="font-semibold text-green-800">WordPress Service</div>
                                <div className="text-sm text-green-600">matcanban-wordpress</div>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                                <div className="font-semibold text-green-800">Cloud SQL Database</div>
                                <div className="text-sm text-green-600">matcanban-mysql</div>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                                <div className="font-semibold text-green-800">Cloud Storage</div>
                                <div className="text-sm text-green-600">matcanban-media</div>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>

                        <div className="pt-4 border-t">
                            <a 
                                href="https://matcanban-wordpress-rhcjwiv3qa-as.a.run.app/wp-admin" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary w-full text-center"
                            >
                                Mở WordPress Admin Panel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: CogIcon },
        { id: 'posts', name: 'Bài viết', icon: DocumentTextIcon },
        { id: 'media', name: 'Media', icon: PhotoIcon },
        { id: 'settings', name: 'Cài đặt', icon: CogIcon },
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

export default WordPressCMS;
