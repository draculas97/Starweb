const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },

    // Assessment
    assessment: {
        collectsPersonalData: Boolean,
        usesCookies: Boolean,
        targetRegions: [String], // EU, US, Global
        industry: String
    },

    // Generated Policies
    policies: [{
        type: { type: String, enum: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
        content: String, // Markdown or HTML
        version: { type: Number, default: 1 },
        generatedAt: { type: Date, default: Date.now },
        approved: { type: Boolean, default: false }
    }],

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compliance', ComplianceSchema);
