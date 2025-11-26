import React from 'react';
import LeadForm from './components/LeadForm';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl w-full p-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Starweb Website Builder</h1>
                <p className="text-center text-gray-600 mb-8">Get started with your dream website today.</p>
                <LeadForm />
            </div>
        </div>
    );
}

export default App;
