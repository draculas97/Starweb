import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ClientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock Data Fetching
    useEffect(() => {
        // In production, fetch from /api/clients/:id
        setTimeout(() => {
            setClient({
                _id: id,
                name: 'Sarabesh Sriram',
                company: 'Stacia Corp',
                email: 'sarabeshsriram@staciacorp.com',
                phone: '+1 555 0123',
                industry: 'E-Commerce',
                status: 'Active',
                aiSummary: 'Client is focused on high-conversion e-commerce. Prefers minimalist design (black/white). High potential for SEO upsell.',
                domain: { name: 'staciacorp.com', registrar: 'GoDaddy', expiry: '2025-11-20' },
                hosting: { provider: 'AWS', plan: 't3.medium', ip: '192.168.1.1' },
                assets: [
                    { name: 'Logo.png', url: '#', type: 'image' },
                    { name: 'BrandGuide.pdf', url: '#', type: 'document' }
                ],
                credentials: {
                    ftp: { host: 'ftp.stacia.com', user: 'admin' },
                    db: { host: 'db.stacia.com', user: 'root' }
                },
                timeline: [
                    { date: '2024-11-01', event: 'Inquiry Received' },
                    { date: '2024-11-02', event: 'PRD Sent' },
                    { date: '2024-11-05', event: '50% Payment Received' },
                    { date: '2024-11-06', event: 'Project Started' }
                ],
                invoices: [
                    { id: 'INV-001', amount: 2500, status: 'Paid', date: '2024-11-05', transactions: ['TXN_12345'] },
                    { id: 'INV-002', amount: 2500, status: 'Pending', date: '2024-12-01', transactions: [] }
                ]
            });
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) return <div className="p-8">Loading client profile...</div>;
    if (!client) return <div className="p-8">Client not found.</div>;

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {client.name.charAt(0)}
                    </div>
                    <div className="ml-6">
                        <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                        <p className="text-gray-500">{client.company} • {client.industry}</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Edit Profile</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30">Contact Client</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white px-6 rounded-t-xl">
                {['Overview', 'Project & Assets', 'Finance', 'Credentials', 'Timeline'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                        className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.toLowerCase().split(' ')[0]
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white p-6 rounded-b-xl shadow-sm border border-gray-100 border-t-0 min-h-[400px]">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Client Summary</h3>
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-indigo-800 text-sm leading-relaxed">
                                ✨ {client.aiSummary}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-medium text-gray-900">{client.email}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Phone</span>
                                    <span className="font-medium text-gray-900">{client.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Domain & Hosting</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Domain</span>
                                    <span className="font-mono text-sm">{client.domain.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Registrar</span>
                                    <span className="font-medium text-sm">{client.domain.registrar}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Hosting</span>
                                    <span className="font-medium text-sm">{client.hosting.provider} ({client.hosting.plan})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROJECT & ASSETS TAB */}
                {activeTab === 'project' && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Project Assets</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {client.assets.map((asset, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-2">
                                        {asset.type === 'image' ? '🖼️' : '📄'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 truncate w-full">{asset.name}</span>
                                </div>
                            ))}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-colors">
                                <span>+ Upload New</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-4">Code Repository</h3>
                        <div className="bg-gray-900 text-white p-4 rounded-lg flex justify-between items-center font-mono text-sm">
                            <span>git@github.com:starweb/{client.company.toLowerCase().replace(' ', '')}.git</span>
                            <button className="text-blue-400 hover:text-blue-300">Copy</button>
                        </div>
                    </div>
                )}

                {/* FINANCE TAB */}
                {activeTab === 'finance' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Invoices & Ledger</h3>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Create Invoice</button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {client.invoices.map((inv, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">${inv.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                            {inv.transactions.length > 0 ? inv.transactions.join(', ') : '-'}
                                            <button className="ml-2 text-blue-600 hover:underline text-xs">Add</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* CREDENTIALS TAB */}
                {activeTab === 'credentials' && (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            🔒
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Secured Vault</h3>
                        <p className="text-gray-500 mb-6">Access to this client's credentials requires 2FA verification.</p>
                        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 shadow-lg shadow-red-500/30">
                            Unlock Vault
                        </button>
                    </div>
                )}

                {/* TIMELINE TAB */}
                {activeTab === 'timeline' && (
                    <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 py-4">
                        {client.timeline.map((item, idx) => (
                            <div key={idx} className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                                <h4 className="text-md font-bold text-gray-900">{item.event}</h4>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
