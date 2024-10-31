const User = require('../models/User');
const Project = require('../models/Project');

const getAllUserProjects = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const projects = user.projects.map(project => Project.findById(project));
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

module.exports = {
    getAllUserProjects,
};