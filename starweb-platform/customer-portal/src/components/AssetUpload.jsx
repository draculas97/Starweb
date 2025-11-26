import React from 'react';

export default function AssetUpload() {
    async function upload(e) {
        let files = e.target.files;
        let formData = new FormData();
        for (let f of files) formData.append('assets', f);

        // Placeholder API call
        // await fetch('/api/upload', { method: 'POST', body: formData });
        alert('Upload functionality would trigger here.');
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Upload Assets</h2>
            <p className="text-gray-500 text-sm mb-4">Upload your brand logos, images, and PRD documents here.</p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input type="file" multiple onChange={upload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-medium">
                    Click to upload
                </label>
                <p className="text-xs text-gray-400 mt-2">PNG, JPG, PDF up to 10MB</p>
            </div>
        </div>
    );
}
