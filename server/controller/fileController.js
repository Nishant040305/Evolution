const User = require("../models/User");
const Project = require("../models/Project");

const createFile = async (req, res) => {
    try {
        const file = req.body;
        console.log("Creating file: ", req.params.id, file);
        if (!file.name) {
            return res.status(400).json({ message: 'File name is required' });
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.files.some(f => f.name === file.name)) {
            console.log("File already exists");
            return res.status(400).json({ message: 'File already exists', file });
        }

        project.version += 1;
        project.commitMessage = `Create file ${file.name}`;
        await project.save(); // Save the project first to create revision

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $push: { files: file } },
            { new: true }
        );

        console.log(updatedProject.files);

        return res.status(201).json(file);
    } catch (error) {
        console.error('Error during file creation:', error);
        return res.status(500).json({ message: 'Error creating file', error });
    }
};


const deleteFile = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'File name is required' });
        }
        const file = project.files.find(f => f.name === name);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        project.files = project.files.filter(f => f.name !== name);
        project.version += 1;
        project.commitMessage = `Delete file ${name}`;
        await project.save();
        return res.status(200).json({ message: 'File deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting file', error });
    }
}

const updateFile = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const { name, data } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'File name is required' });
        }
        const file = project.files.find(f => f.name === name);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        project.files = project.files.map(f => f.name === name ? { ...f, ...data } : f);
        project.version += 1;
        project.commitMessage = `Update file ${name}`;
        await project.save();
        return res.status(200).json(file);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating file', error });
    }
}

module.exports = {
    createFile,
    deleteFile,
    updateFile,
};