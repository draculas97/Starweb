import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showHandoverModal, setShowHandoverModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Mock data for demo
        setProjects([
            {
                _id: 'p1',
                clientId: { company: 'TechNova' },
                status: 'Building',
                team: { pm: { name: 'Sarah' }, developer: { name: 'Mike' } },
                payments: { initial50: { status: 'Paid' } },
                gitRepo: 'github.com/starweb/technova',
                previewLink: 'technova.starweb.dev'
            },
            {
                _id: 'p2',
                clientId: { company: 'GreenEats' },
                status: 'Review',
                team: { pm: { name: 'Sarah' }, developer: { name: 'Dav' } },
                payments: { initial50: { status: 'Paid' } },
                gitRepo: 'github.com/starweb/greeneats',
                previewLink: 'greeneats.starweb.dev'
            }
        ]);
    }, []);

    const handleGeneratePrompt = (projectId) => {
        alert(`Generating AI Prompt for Project ${projectId}...\n\n[System]: Prompt sent to AI Builder.`);
    };

    const handleViewPRD = (projectId) => {
        window.open('#', '_blank'); // Placeholder for real document URL
        alert('Opening PRD Document...');
    };

    const handleHandover = (project) => {
        setSelectedProject(project);
        setShowHandoverModal(true);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Project Handling</h1>
                <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                >
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{project.clientId?.company}</h3>
                                <p className="text-xs text-gray-500">ID: {project._id}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                {project.status}
                            </span>
                        </div>

                        <div className="space-y-3 flex-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">PM:</span>
                                <span className="font-medium text-gray-900">{project.team?.pm?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Dev:</span>
                                <span className="font-medium text-gray-900">{project.team?.developer?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Payment (50%):</span>
                                <span className={`font-bold ${project.payments?.initial50?.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    {project.payments?.initial50?.status}
                                </span>
                            </div>

                            {project.previewLink && (
                                <div className="mt-2 p-2 bg-gray-50 rounded text-xs truncate border border-gray-100">
                                    <span className="text-gray-400">Preview: </span>
                                    <a href={`https://${project.previewLink}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">{project.previewLink}</a>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                            <button onClick={() => handleViewPRD(project._id)} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded font-medium transition-colors">View PRD</button>
                            <button onClick={() => handleGeneratePrompt(project._id)} className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2.5 rounded font-medium transition-colors">AI Prompt</button>
                            <button onClick={() => handleHandover(project)} className="text-xs bg-green-50 hover:bg-green-100 text-green-700 py-2.5 rounded font-medium col-span-2 transition-colors">Manage Handover</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Project Modal (Mock) */}
            {showNewProjectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
                        <div className="space-y-4">
                            <input placeholder="Client Company Name" className="w-full p-2 border rounded" />
                            <select className="w-full p-2 border rounded">
                                <option>Select Lead...</option>
                                <option>TechNova</option>
                            </select>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={() => { alert('Project Created!'); setShowNewProjectModal(false); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Handover Modal (Mock) */}
            {showHandoverModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Handover Checklist: {selectedProject?.clientId?.company}</h2>
                        <div className="space-y-2 mb-6">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                <span>Final Payment Received</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                <span>Code Pushed to Production</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                <span>Credentials Transferred</span>
                            </label>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowHandoverModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Close</button>
                            <button onClick={() => { alert('Handover Complete!'); setShowHandoverModal(false); }} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Complete Handover</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
