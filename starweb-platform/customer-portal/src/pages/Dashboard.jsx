import React, { useState, useEffect } from 'react';
import TimelineStepper from '../components/TimelineStepper';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    // Mock Project Data
    const [project, setProject] = useState({
        status: 'Initiation',
        payments: { initial50: { status: 'Pending' } }
    });

    const steps = ['Inquiry', 'Assessment', 'Commitment', 'Initiation', 'Building', 'Review', 'Finalization', 'Handover'];
    const currentStepIndex = steps.indexOf(project.status);

    const handlePayNow = () => {
        alert('Redirecting to Payment Gateway (Stripe)...');
        // In real app: window.location.href = stripeCheckoutUrl;
    };

    const handleUpload = () => {
        navigate('/upload');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back!</h1>
                    <p className="opacity-90 text-sm md:text-base">Your project is currently in the <span className="font-bold text-yellow-300">{project.status}</span> phase.</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            </div>

            {/* Timeline Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Project Timeline</h2>
                <div className="overflow-x-auto pb-4">
                    <TimelineStepper steps={steps} current={currentStepIndex} />
                </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 text-lg">Initial Payment</h3>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Pending</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">50% deposit required to start the AI Build process.</p>
                    </div>
                    <button onClick={handlePayNow} className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-lg shadow-gray-200">
                        Pay Now ($2,500)
                    </button>
                </div>

                {/* PRD Upload Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Project Requirements</h3>
                        <p className="text-gray-500 text-sm mb-6">Please upload your PRD and Brand Assets to proceed.</p>
                    </div>
                    <button onClick={handleUpload} className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition">
                        Upload Documents
                    </button>
                </div>
            </div>

            {/* Upsell Banner (Cross-selling) */}
            <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-sm">
                <div className="mb-4 md:mb-0">
                    <h4 className="font-bold text-purple-900 text-lg">Boost your SEO?</h4>
                    <p className="text-purple-700 text-sm">Get our premium SEO package for 20% off. Includes keyword analysis and content strategy.</p>
                </div>
                <button className="text-sm bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200">View Offer</button>
            </div>
        </div>
    );
}
