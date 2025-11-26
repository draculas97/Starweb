import React from 'react';

export default function TimelineStepper({ steps, current }) {
    return (
        <div className="relative">
            {steps.map((step, idx) => (
                <div key={step} className="flex items-center mb-4 last:mb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${idx <= current ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {idx + 1}
                    </div>
                    <div className={`text-sm ${idx <= current ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                        {step}
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`absolute left-4 top-8 w-0.5 h-4 -ml-px ${idx < current ? 'bg-blue-600' : 'bg-gray-200'
                            }`} style={{ top: `${(idx * 3) + 2}rem` }}></div>
                    )}
                </div>
            ))}
        </div>
    );
}
