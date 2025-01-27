const { desc } = require('framer-motion/client');
const Notifications = require('../models/Notifications');
const Project = require('../models/Project');
const User = require('../models/User');

const inviteMember = async (req, res) => {
  try {
    console.log('HERE');
    const { id } = req.params;
    const { userid, role } = req.body;
    const user = await User.findById(userid);
    if (!user||!user.verify) {
      return res.status(404).json({ message: 'User not found' });
    }
    const project = await Project.findById(id).populate(
      'user members.user description name'
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const member = project.members.find(
      (m) => m.user._id.toString() === user._id.toString()
    );
    if (member) {
      return res.status(400).json({ message: 'User already invited' });
    }
    await Project.updateOne(
      { _id: id },
      { $push: { members: { user, role, status: 'pending' } } }
    );
    const NotificationInvite = new Notifications({
      type: 'collaborationRequest',
      title: 'Collaboration Request',
      message: {
        senderId: req.user._id,
        projectName: project.name,
        groupChatId: project.groupChatId,
        roleOffered: role,
        dateOfProjectCreated: project.createdAt,
        description: project.description,
        projectId: project._id,
      },
      read: false,
      receiverId: userid,
    });
    await NotificationInvite.save();
    console.log(NotificationInvite);
    res
      .status(200)
      .json({
        message: 'User invited successfully',
        Notification: NotificationInvite,
      });
  } catch (error) {
    return res.status(500).json({ message: 'Error inviting user', error });
  }
};

const updateMemberRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid, role } = req.body;
    const user = await User.findById(userid);
    if (!user||!user.verify) {
      return res.status(404).json({ message: 'User not found' });
    }
    const project = await Project.findById(id).populate('user members.user');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const member = project.members.find(
      (m) => m.user._id.toString() === user._id.toString()
    );
    if (!member) {
      return res.status(400).json({ message: 'User not invited' });
    }
    await Project.updateOne(
      { _id: id, 'members.user': userid }, // Match project and member by user ID
      { $set: { 'members.$.role': role } } // Update the role field for the matched member
    );
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user role', error });
  }
};

const removeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body;
    const user = await User.findById(userid);
    if (!user||!user.verify) {
      return res.status(404).json({ message: 'User not found' });
    }
    const project = await Project.findById(id).populate('user members.user');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const member = project.members.find(
      (m) => m.user._id.toString() === user._id.toString()
    );
    if (!member) {
      return res.status(400).json({ message: 'User not invited' });
    }
    await Project.updateOne(
      { _id: id },
      { $pull: { members: { user: user._id } } }
    );
    await User.updateOne({ _id: user._id }, { $pull: { sharedProjects: id } });
    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing user', error });
  }
};
const acceptCollaboration = async (req, res) => {
  try {
    const { id } = req.params; // Project ID
    const { userid } = req.body; // User ID from request body

    // Find the user
    const user = await User.findById(userid);
    if (!user||!user.verify) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the project
    const project = await Project.findById(id).populate('user members.user');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is already a member
    const member = project.members.find(
      (m) => m.user._id.toString() === user._id.toString()
    );
    if (!member) {
      return res.status(400).json({ message: 'User not invited' });
    }

    // Update the member's status to "active"
    await Project.updateOne(
      { _id: id, 'members.user': user._id },
      { $set: { 'members.$.status': 'active' } }
    );

    // Add the project ID to the user's sharedProjects
    await User.updateOne(
      { _id: userid },
      { $addToSet: { sharedProjects: id } } // Avoid duplicates with $addToSet
    );

    res.status(200).json({ message: 'Collaboration accepted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error accepting collaboration', error });
  }
};
module.exports = {
  inviteMember,
  updateMemberRole,
  removeMember,
  acceptCollaboration,
};
