import React from 'react';
import { NavLink } from 'react-router-dom';
import { PencilIcon, Cog6ToothIcon, PhotoIcon, RocketLaunchIcon } from '../components/Icons';

const AdminHubPage: React.FC = () => {
    const tools = [
        { name: 'User Management', path: '/admin', icon: <PencilIcon className="w-10 h-10" />, description: 'Edit user roles and banana balances.' },
        { name: 'Content Data Editor (AIO)', path: '/aio', icon: <Cog6ToothIcon className="w-10 h-10" />, description: 'Directly edit the raw JSON data for all application content.' },
        { name: 'Asset Browser', path: '/asset-browser', icon: <PhotoIcon className="w-10 h-10" />, description: 'View and manage media assets for lessons.' },
        { name: 'MatCanBan CMS', path: '/admin/cms', icon: <RocketLaunchIcon className="w-10 h-10" />, description: 'Manage website content with integrated CMS system.' },
        { name: 'Data Sync to Cloud', path: '/aio', icon: <RocketLaunchIcon className="w-10 h-10" />, description: 'Push local data changes to the live database. (Located in AIO)' },
    ];

    return (
        <div className="max-w-7xl mx-auto pt-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">Super Admin Hub</h1>
                <p className="mt-4 text-xl text-gray-600">Central dashboard for managing the entire application.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tools.map(tool => (
                    <NavLink 
                        key={tool.path} 
                        to={tool.path} 
                        // For Data Sync, navigate to AIO page and the component is there
                        className="card-base bg-white border p-6 flex flex-col items-center text-center card-hover group"
                    >
                        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4 transition-transform group-hover:scale-110">
                            {tool.icon}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{tool.name}</h2>
                        <p className="text-gray-600 mt-2 flex-grow">{tool.description}</p>
                        <span className="mt-4 text-indigo-600 font-semibold group-hover:underline">
                            Go to Tool &rarr;
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default AdminHubPage;
