const User = require('../models/User');
const Project = require('../models/Project');

const getAllUserProjects = async (req, res) => {
    try {
        console.log(req.params.id);

        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retrieve all projects using Promise.all to handle async operations
        const projects = await Promise.all(user.projects.map(projectId => Project.findById(projectId)));

        console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
};


module.exports = {
    getAllUserProjects,
};