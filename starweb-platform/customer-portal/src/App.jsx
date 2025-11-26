import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AssetUpload from './components/AssetUpload';
import Chat from './components/Chat';

// Icons
const Icons = {
    Home: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Upload: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    Chat: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    Preview: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
};

function NavItem({ to, icon, label }) {
    const location = useLocation();
    const active = location.pathname === to;
    return (
        <Link to={to} className={`flex flex-col items-center justify-center w-full py-2 ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {icon()}
            <span className="text-[10px] mt-1 font-medium">{label}</span>
        </Link>
    );
}

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-gray-50 font-sans">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 md:hidden">
                    <div className="font-bold text-xl text-blue-600 tracking-tight">Starweb</div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-medium text-gray-600">Online</span>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Desktop Sidebar (Hidden on Mobile) */}
                    <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col pt-8 px-4 shadow-xl z-10">
                        <div className="mb-8 px-2">
                            <span className="text-2xl font-bold text-blue-600">Starweb</span>
                        </div>
                        <div className="space-y-2">
                            <Link to="/" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">Dashboard</Link>
                            <Link to="/upload" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">Assets & PRD</Link>
                            <Link to="/preview" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">Live Preview</Link>
                            <Link to="/chat" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">Team Chat</Link>
                        </div>
                        <div className="mt-auto mb-8 p-4 bg-blue-50 rounded-lg">
                            <h4 className="text-sm font-bold text-blue-800 mb-1">Need Help?</h4>
                            <p className="text-xs text-blue-600 mb-2">Contact your project manager directly via chat.</p>
                            <Link to="/chat" className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-medium hover:bg-blue-700 inline-block">Open Chat</Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-8 md:px-12 lg:px-20 bg-gray-50">
                        <div className="max-w-4xl mx-auto pt-4 md:pt-8">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/upload" element={<AssetUpload />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/preview" element={<div className="p-10 bg-white rounded-xl shadow-sm h-96 flex flex-col items-center justify-center text-gray-400 border border-gray-200"><span className="text-4xl mb-4">🖥️</span><p>Live Preview is available after the Build phase starts.</p></div>} />
                            </Routes>
                        </div>
                    </main>
                </div>

                {/* Mobile Bottom Navigation */}
                <nav className="bg-white border-t border-gray-200 flex justify-around items-center fixed bottom-0 w-full z-20 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <NavItem to="/" icon={Icons.Home} label="Home" />
                    <NavItem to="/upload" icon={Icons.Upload} label="Upload" />
                    <NavItem to="/preview" icon={Icons.Preview} label="Preview" />
                    <NavItem to="/chat" icon={Icons.Chat} label="Chat" />
                </nav>
            </div>
        </Router>
    );
}

export default App;
