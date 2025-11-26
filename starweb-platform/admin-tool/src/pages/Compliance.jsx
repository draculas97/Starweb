import React, { useState } from 'react';

export default function Compliance() {
    const [showAssessmentModal, setShowAssessmentModal] = useState(false);
    const [showPolicyEditor, setShowPolicyEditor] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const handlePolicyClick = (policy) => {
        setSelectedPolicy(policy);
        setShowPolicyEditor(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
                <button
                    onClick={() => setShowAssessmentModal(true)}
                    className="btn-action bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 px-6 py-2.5 rounded-lg font-semibold"
                >
                    New Assessment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Policy Generator Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg mr-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Policy Generator</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Automatically generate Terms of Service and Privacy Policies based on client industry and region.</p>
                    <div className="space-y-3">
                        <div onClick={() => handlePolicyClick({ name: 'Privacy Policy', client: 'TechNova' })} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">TechNova (SaaS) - Privacy</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Compliant</span>
                        </div>
                        <div onClick={() => handlePolicyClick({ name: 'Terms of Service', client: 'GreenEats' })} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">GreenEats (E-com) - ToS</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Review Needed</span>
                        </div>
                    </div>
                </div>

                {/* Region Map Placeholder */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                        [Interactive Compliance Map]
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Regional Regulations</h3>
                    <p className="text-gray-500 text-sm">Active monitoring for GDPR (EU), CCPA (California), and LGPD (Brazil).</p>
                </div>
            </div>

            {/* Assessment Modal */}
            {showAssessmentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-6">New Compliance Assessment</h2>
                        <div className="space-y-4">
                            <select className="w-full p-2 border rounded-lg"><option>Select Client...</option><option>TechNova</option></select>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                                    <span>Collects Personal Data (Email, Name)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                                    <span>Uses Cookies / Tracking</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                                    <span>Processes Payments</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-3">
                            <button onClick={() => setShowAssessmentModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button onClick={() => { alert('Assessment Started!'); setShowAssessmentModal(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Run Assessment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Policy Editor Modal */}
            {showPolicyEditor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full h-[80vh] flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Editing: {selectedPolicy?.name} ({selectedPolicy?.client})</h2>
                        <textarea className="flex-1 w-full p-4 border rounded-lg font-mono text-sm bg-gray-50 resize-none focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue={`# ${selectedPolicy?.name}\n\nLast Updated: ${new Date().toLocaleDateString()}\n\n1. Introduction\nWelcome to ${selectedPolicy?.client}...`}></textarea>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={() => setShowPolicyEditor(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Close</button>
                            <button onClick={() => { alert('Policy Saved!'); setShowPolicyEditor(false); }} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
