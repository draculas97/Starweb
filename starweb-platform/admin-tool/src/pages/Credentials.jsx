import React, { useState } from 'react';

export default function Credentials() {
    const [locked, setLocked] = useState(true);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);

    function handleUnlock(e) {
        e.preventDefault();
        if (passcode === '1234') { // Mock passcode
            setLocked(false);
            setError(false);
        } else {
            setError(true);
        }
    }

    if (locked) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Restricted Access</h2>
                    <p className="text-gray-500 text-sm mb-6">Enter your secondary security passcode to access the Credentials Vault.</p>

                    <form onSubmit={handleUnlock}>
                        <input
                            type="password"
                            maxLength="4"
                            placeholder="••••"
                            className="text-center text-2xl tracking-widest w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 outline-none"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs mb-4">Incorrect passcode.</p>}
                        <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Unlock Vault</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Credentials Vault</h1>
                <button onClick={() => setLocked(true)} className="text-sm text-red-600 hover:text-red-800 font-medium">Lock Vault</button>
            </div>

            <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-start mb-6">
                <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                    <h4 className="text-sm font-bold text-red-800">Sensitive Data Area</h4>
                    <p className="text-xs text-red-700 mt-1">All actions in this module are logged. Do not share credentials externally.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['TechNova', 'GreenEats', 'DayDesigns'].map((client, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">{client}</h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">ID: {1000 + idx}</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                <span className="text-sm text-gray-600">FTP Host</span>
                                <code className="text-xs font-mono bg-white px-2 py-1 rounded border">ftp.{client.toLowerCase()}.com</code>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                                <span className="text-sm text-gray-600">Database Password</span>
                                <div className="flex items-center">
                                    <span className="text-xs font-mono mr-2">••••••••••••</span>
                                    <button className="text-blue-600 text-xs hover:underline">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
