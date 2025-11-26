import React, { useState } from 'react';

export default function Finance() {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [activeTab, setActiveTab] = useState('transactions'); // transactions, invoices, templates
    const [filter, setFilter] = useState('all'); // all, paid, pending

    const transactions = [
        { id: 'INV-2024-001', client: 'TechNova', date: 'Oct 24, 2024', amount: '$2,500.00', status: 'Paid', type: 'Invoice' },
        { id: 'INV-2024-002', client: 'GreenEats', date: 'Oct 25, 2024', amount: '$1,200.00', status: 'Pending', type: 'Invoice' },
        { id: 'EXP-2024-089', client: 'AWS Services', date: 'Oct 26, 2024', amount: '-$450.00', status: 'Paid', type: 'Expense' },
        { id: 'INV-2024-003', client: 'DayDesigns', date: 'Oct 27, 2024', amount: '$3,000.00', status: 'Pending', type: 'Invoice' },
    ];

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.status.toLowerCase() === filter;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Financial Ledger</h1>
                <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="btn-action bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 px-6 py-2.5 rounded-lg font-semibold"
                >
                    Create Invoice
                </button>
            </div>

            {/* Interactive Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => setFilter('all')} className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${filter === 'all' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100 hover:border-blue-300'}`}>
                    <p className="text-sm font-medium text-gray-500">Total Revenue (YTD)</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$145,200</p>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <span>↑ 12% from last month</span>
                    </div>
                </div>
                <div onClick={() => setFilter('pending')} className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${filter === 'pending' ? 'border-yellow-500 ring-2 ring-yellow-100' : 'border-gray-100 hover:border-yellow-300'}`}>
                    <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$12,500</p>
                    <div className="mt-4 flex items-center text-sm text-yellow-600">
                        <span>3 invoices overdue</span>
                    </div>
                </div>
                <div onClick={() => setFilter('paid')} className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${filter === 'paid' ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-100 hover:border-green-300'}`}>
                    <p className="text-sm font-medium text-gray-500">Expenses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$34,100</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span>Server costs, API usage</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button onClick={() => setActiveTab('transactions')} className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'transactions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Transactions</button>
                <button onClick={() => setActiveTab('templates')} className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'templates' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Invoice Templates</button>
            </div>

            {/* Transactions Table */}
            {activeTab === 'transactions' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">
                            {filter === 'all' ? 'All Transactions' : filter === 'pending' ? 'Pending Invoices' : 'Paid Transactions'}
                        </h3>
                        <button className="text-sm text-gray-500 hover:text-gray-700">Export CSV</button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTransactions.map((tx, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tx.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{tx.client}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                                    <td className={`px-6 py-4 text-sm font-bold ${tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>{tx.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button onClick={() => alert(`Viewing details for ${tx.id}`)} className="text-blue-600 hover:underline mr-3 font-medium">Details</button>
                                        <button className="text-gray-500 hover:text-gray-700">+ Txn</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Invoice Templates (Zoho Style Mock) */}
            {activeTab === 'templates' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold text-gray-900">Invoice Template Editor</h3>
                        <div className="space-x-3">
                            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">Preview</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Template</button>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-8 max-w-3xl mx-auto shadow-lg bg-white min-h-[600px] relative">
                        {/* Mock Editor UI */}
                        <div className="absolute top-4 right-4 text-gray-300 text-4xl font-bold opacity-20">LOGO</div>
                        <div className="border-b-2 border-blue-600 pb-4 mb-8">
                            <h1 className="text-4xl font-bold text-gray-800">INVOICE</h1>
                            <p className="text-gray-500 mt-1"># INV-00001</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Bill To:</p>
                                <div className="h-20 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
                                    [Client Details Placeholder]
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm"><span className="font-bold">Date:</span> [Current Date]</p>
                                <p className="text-sm"><span className="font-bold">Due Date:</span> [Due Date]</p>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-2 text-sm font-bold text-gray-700">Item Description</th>
                                    <th className="text-right p-2 text-sm font-bold text-gray-700">Qty</th>
                                    <th className="text-right p-2 text-sm font-bold text-gray-700">Rate</th>
                                    <th className="text-right p-2 text-sm font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border-b text-sm">Web Development Services</td>
                                    <td className="p-2 border-b text-right text-sm">1</td>
                                    <td className="p-2 border-b text-right text-sm">$2,500.00</td>
                                    <td className="p-2 border-b text-right text-sm">$2,500.00</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-1/2">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="font-bold">Sub Total</span>
                                    <span>$2,500.00</span>
                                </div>
                                <div className="flex justify-between py-2 text-xl font-bold text-blue-600">
                                    <span>Total</span>
                                    <span>$2,500.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Invoice Modal */}
            {showInvoiceModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-6">Create New Invoice</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                                <select className="w-full p-2 border rounded-lg bg-gray-50">
                                    <option>Select Client...</option>
                                    <option>TechNova</option>
                                    <option>GreenEats</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                    <input type="number" placeholder="0.00" className="w-full p-2 border rounded-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input type="date" className="w-full p-2 border rounded-lg bg-gray-50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea className="w-full p-2 border rounded-lg bg-gray-50" rows="3" placeholder="Project milestone..."></textarea>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-3">
                            <button onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button onClick={() => { alert('Invoice Created!'); setShowInvoiceModal(false); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30">Generate Invoice</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
