const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: String,
    industry: String,
    websiteGoal: String,
    status: {
        type: String,
        enum: ['New Inquiry', 'Contacted', 'Qualified', 'Unqualified', 'Converted'],
        default: 'New Inquiry'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
