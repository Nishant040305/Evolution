const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');

const getAllUserProjects = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if `id` is provided and is a valid ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retrieve all projects associated with the user
        const projects = await Promise.all(user.projects.map(projectId => Project.findById(projectId)));
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

module.exports = {
    getAllUserProjects,
};
