const express = require('express');
const router = express.Router();
const Compliance = require('../models/Compliance');
const { auth, roleCheck } = require('../middleware/auth');

// Run Assessment & Generate Policies (Admin)
router.post('/assess', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const { clientId, projectId, assessment } = req.body;

        // Mock Policy Generation Logic
        const policies = [];
        if (assessment.collectsPersonalData) {
            policies.push({
                type: 'Privacy Policy',
                content: `# Privacy Policy\n\nWe collect data... (Generated for ${assessment.industry})`
            });
        }
        if (assessment.targetRegions.includes('EU')) {
            policies.push({
                type: 'Cookie Policy',
                content: `# Cookie Policy\n\nWe use cookies in accordance with GDPR...`
            });
        }

        const newCompliance = new Compliance({
            clientId,
            projectId,
            assessment,
            policies
        });

        await newCompliance.save();
        res.json(newCompliance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Compliance Record (Admin/Customer)
router.get('/:projectId', auth, async (req, res) => {
    try {
        const record = await Compliance.findOne({ projectId: req.params.projectId });
        if (!record) return res.status(404).json({ msg: 'Compliance record not found' });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
