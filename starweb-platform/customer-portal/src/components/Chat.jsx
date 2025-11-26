import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        // Join a dummy project room
        socket.emit('join_project', 'project_123');

        return () => socket.off('receive_message');
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const msgData = {
                projectId: 'project_123',
                message: input,
                sender: 'Me' // In real app, get from auth
            };
            socket.emit('send_message', msgData);
            setMessages((prev) => [...prev, msgData]); // Optimistic update
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-lg shadow">
            <div className="p-4 border-b font-bold">Team Chat</div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'Me' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}>
                            <p className="text-sm">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t flex">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-l-lg p-2 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r-lg">Send</button>
            </div>
        </div>
    );
}
