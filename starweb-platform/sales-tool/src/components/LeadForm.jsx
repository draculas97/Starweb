import React, { useState } from 'react';

export default function LeadForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        websiteGoal: '',
        websiteType: 'New Build'
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            console.log('Submitting form:', form);
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            console.log('Response status:', res.status);

            if (res.ok) {
                setStatus('success');
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.msg || 'Server rejected the request');
                setStatus('error');
            }
        } catch (err) {
            console.error('Network error:', err);
            setErrorMessage('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="card max-w-md w-full text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received</h2>
                    <p className="text-gray-600 mb-6">Thanks, {form.name}. We've started your profile. Our team will contact you shortly for the next steps.</p>
                    <button onClick={() => { setStatus('idle'); setForm({ ...form, name: '', email: '' }); }} className="text-blue-600 font-medium hover:underline">Start another request</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Left Side - Brand / Info */}
                <div className="bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Starweb.</h1>
                        <p className="text-blue-100">Premium Website Development</p>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-semibold mb-4">Let's build something extraordinary.</h3>
                        <ul className="space-y-3 text-blue-100 text-sm">
                            <li className="flex items-center"><span className="mr-2">✓</span> AI-Driven Architecture</li>
                            <li className="flex items-center"><span className="mr-2">✓</span> Psychometric Design Matching</li>
                            <li className="flex items-center"><span className="mr-2">✓</span> Enterprise-Grade Security</li>
                        </ul>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Inquiry</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name</label>
                                <input name="name" required placeholder="Jane Doe" value={form.name} onChange={handleChange} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Company</label>
                                <input name="company" placeholder="Acme Inc." value={form.company} onChange={handleChange} className="input-field" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                            <input name="email" type="email" required placeholder="jane@acme.com" value={form.email} onChange={handleChange} className="input-field" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Industry</label>
                                <select name="industry" value={form.industry} onChange={handleChange} className="input-field">
                                    <option value="">Select...</option>
                                    <option value="E-commerce">E-Commerce</option>
                                    <option value="SaaS">SaaS</option>
                                    <option value="Service">Service / Agency</option>
                                    <option value="Portfolio">Portfolio</option>
                                    <option value="Healthcare">Healthcare</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
                                <select name="websiteType" value={form.websiteType} onChange={handleChange} className="input-field">
                                    <option value="New Build">New Build</option>
                                    <option value="Redesign">Redesign</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Primary Goal</label>
                            <input name="websiteGoal" placeholder="e.g. Increase conversion by 20%" value={form.websiteGoal} onChange={handleChange} className="input-field" />
                        </div>

                        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full mt-4">
                            {status === 'loading' ? 'Processing...' : 'Start Project'}
                        </button>

                        {status === 'error' && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-100">
                                <p className="font-bold">Submission Failed</p>
                                <p>{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
