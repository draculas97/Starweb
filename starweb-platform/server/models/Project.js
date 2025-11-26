const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    status: {
        type: String,
        enum: ['Inquiry', 'Assessment', 'Commitment', 'Initiation', 'Building', 'Review', 'Finalization', 'Handover', 'Completed'],
        default: 'Inquiry'
    },
    // Team Assignment
    team: {
        pm: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        designer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    // Project Details
    psychometric: {
        tone: String,
        layout: String,
        colors: [String],
        fontPreference: String
    },
    prd: {
        documentUrl: String,
        approved: { type: Boolean, default: false }
    },
    assets: [{ url: String, name: String, uploadedAt: Date }],

    // Technical & Output
    gitRepo: String,
    previewLink: String,
    deploymentLink: String,

    // Feedback Loop
    changeRequests: [{
        comment: String,
        coordinates: { x: Number, y: Number },
        status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' },
        isBillable: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],
    freeChangesUsed: { type: Number, default: 0 },

    // Financials
    payments: {
        initial50: { status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }, amount: Number, date: Date },
        final50: { status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }, amount: Number, date: Date }
    },

    // Compliance
    compliance: {
        requiredPolicies: [String], // GDPR, CCPA
        tosDraft: String,
        privacyDraft: String,
        clientApproved: { type: Boolean, default: false }
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
