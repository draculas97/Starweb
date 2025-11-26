import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClientDetail from './pages/ClientDetail';
import ProjectManager from './pages/ProjectManager';
import Finance from './pages/Finance';
import Compliance from './pages/Compliance';
import Credentials from './pages/Credentials';

// Icons
const Icons = {
    Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    Projects: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    Finance: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Compliance: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
};

function NavLink({ to, label, icon }) {
    const location = useLocation();
    const active = location.pathname === to;
    return (
        <Link to={to} className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}>
            <span className="mr-3">{icon()}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
                {/* Sidebar - Fixed Width, Flex Item */}
                <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 shadow-2xl z-30">
                    <div className="p-6 flex items-center border-b border-gray-800">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mr-3 shadow-lg shadow-blue-500/30"></div>
                        <span className="text-xl font-bold tracking-tight text-white">Starweb</span>
                    </div>

                    <nav className="flex-1 p-4 overflow-y-auto space-y-1">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 mt-2 px-4">Main</div>
                        <NavLink to="/" label="CRM Dashboard" icon={Icons.Dashboard} />
                        <NavLink to="/projects" label="Project Handling" icon={Icons.Projects} />

                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 mt-8 px-4">Operations</div>
                        <NavLink to="/finance" label="Finance & Ledger" icon={Icons.Finance} />
                        <NavLink to="/compliance" label="Compliance" icon={Icons.Compliance} />
                        <NavLink to="/credentials" label="Credentials Vault" icon={Icons.Settings} />
                    </nav>

                    <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold ring-2 ring-gray-800">AD</div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content - Flex Grow */}
                <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                    {/* Header */}
                    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-8 z-20 sticky top-0">
                        <h2 className="text-lg font-semibold text-gray-800">Platform Overview</h2>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Notifications</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </button>
                            <button className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Logout</button>
                        </div>
                    </header>

                    {/* Scrollable Content Area */}
                    <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/crm/:id" element={<ClientDetail />} />
                                <Route path="/projects" element={<ProjectManager />} />
                                <Route path="/finance" element={<Finance />} />
                                <Route path="/compliance" element={<Compliance />} />
                                <Route path="/credentials" element={<Credentials />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
