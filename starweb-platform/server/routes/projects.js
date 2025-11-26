const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, roleCheck } = require('../middleware/auth');

// Get All Projects (Admin/PM)
router.get('/', auth, roleCheck(['admin', 'project_manager']), async (req, res) => {
    try {
        const projects = await Project.find().populate('clientId', 'name email company');
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get My Projects (Customer)
router.get('/my', auth, async (req, res) => {
    try {
        const projects = await Project.find({ clientId: req.user.id });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create Project (Admin/PM)
router.post('/', auth, roleCheck(['admin', 'project_manager']), async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Project (Admin/PM/Dev)
router.put('/:id', auth, roleCheck(['admin', 'project_manager', 'developer']), async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add Change Request (Customer)
router.post('/:id/change-request', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // Check ownership
        if (project.clientId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const isBillable = project.freeChangesUsed >= 3;

        project.changeRequests.push({
            ...req.body,
            isBillable
        });

        if (!isBillable) {
            project.freeChangesUsed += 1;
        }

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Generate AI Prompt (Admin)
router.post('/:id/generate-prompt', auth, roleCheck(['admin', 'project_manager']), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('clientId');
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // Construct Prompt Logic (Mocked)
        const prompt = `
      SYSTEM: You are Stacia Corp AI Builder.
      CLIENT: ${project.clientId.company}
      TONE: ${project.psychometric?.tone || 'Modern'}
      COLORS: ${project.psychometric?.colors?.join(', ') || 'Black, White'}
      PAGES: Home, About, Contact
      COMPLIANCE: ${project.compliance?.requiredPolicies?.join(', ')}
    `;

        // In real scenario, send to AI service here
        res.json({ prompt });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
