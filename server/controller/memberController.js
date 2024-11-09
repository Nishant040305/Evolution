const Project = require('../models/Project');
const User = require('../models/User');

const inviteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid, role } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const project = await Project.findById(id).populate('user members.user');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const member = project.members.find(m => m.user._id.toString() === user._id.toString());
        if (member) {
            return res.status(400).json({ message: 'User already invited' });
        }
        await Project.updateOne(
            { _id: id },
            { $push: { members: { user, role } } }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error inviting user', error });
    }
}

const updateMemberRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid, role } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const project = await Project.findById(id).populate('user members.user');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const member = project.members.find(m => m.user._id.toString() === user._id.toString());
        if (!member) {
            return res.status(400).json({ message: 'User not invited' });
        }
        await Project.updateOne(
            { _id: id },
            { $set: { [`members.${member._id}.role`]: role } }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user role', error });
    }
}

const removeMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const project = await Project.findById(id).populate('user members.user');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const member = project.members.find(m => m.user._id.toString() === user._id.toString());
        if (!member) {
            return res.status(400).json({ message: 'User not invited' });
        }
        await Project.updateOne(
            { _id: id },
            { $pull: { members: { user: user._id } } }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error removing user', error });
    }
}

module.exports = {
    inviteMember,
    updateMemberRole,
    removeMember,
};