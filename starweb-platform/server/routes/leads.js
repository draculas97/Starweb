const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Create Lead (Public)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, industry, websiteGoal, websiteType } = req.body;

        // Basic Validation
        if (!name || !email) {
            return res.status(400).json({ msg: 'Name and Email are required' });
        }

        const newLead = new Lead({
            name,
            email,
            phone,
            company,
            industry,
            websiteGoal,
            websiteType, // Ensure schema supports this or it will be ignored (strict mode)
            status: 'New Inquiry'
        });

        const lead = await newLead.save();
        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get All Leads (Admin)
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
