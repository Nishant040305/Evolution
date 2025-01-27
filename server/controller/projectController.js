const User = require('../models/User');
const Project = require('../models/Project');
const Chat = require('../models/Chat');
const { ImageUpload } = require('../utils/ImageUpload');
const UsersChat = require('../models/UsersChat');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      'user',
      '_id displayname email'
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving projects', error });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'user',
      '_id displayname email'
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

const getProjectVersionHistory = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'user',
      '_id displayname email'
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project.versions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

const revertProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const version = project.versions.find(
      (v) => v.version === parseInt(req.body.version)
    );
    if (!version) {
      return res.status(404).json({ message: 'Version not found' });
    }

    const newVersion = {
      components: version.components || {},
      javascriptContent: version.javascriptContent,
      cssContent: version.cssContent,
      files: version.files,
      timestamp: Date.now(),
      commitMessage: `Reverted to version ${version.version}`,
    };

    console.log(newVersion);

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newVersion },
      { new: true }
    );

    updatedProject.version += 1;
    await updatedProject.save();
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

const createProject = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user||!user.verify) {
      return res.status(404).json({ message: 'User not found' });
    }
    let unread_messages = {};
    unread_messages[user._id] = 0;
    const chat = new Chat({
      groupName: req.body.name,
      type: 'group',
      members: [user._id],
      groupAvatar:
        'https://res.cloudinary.com/dwj0nj7d6/image/upload/v1731223362/Evolution/sp9gkw5kn8sjxvhju7aq.png',
      //admin: user._id
      createdBy: user._id,

      unread_messages: unread_messages,
    });
    await chat.save();
    const setUsersChat = await UsersChat.findOneAndUpdate(
      { user_id: user._id },
      {
        $push: {
          chats: {
            chat_id: chat._id,
            type: 'group',
            isActive: true,
            joinedAt: Date.now(),
          },
        },
      },
      { upsert: true }
    );
    const newProject = new Project({
      name: req.body.name,
      groupChatId: chat._id,
      description: req.body.description,
      user: req.body.user,
      components: {},
    });

    const savedProject = await newProject.save();
    user.projects.push(savedProject._id);
    await user.save();

    savedProject.version += 1;
    await savedProject.save();

    return res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

const updateComponents = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          components: req.body.components,
          commitMessage: 'Updated components',
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // update content of index.html
    const { content } = req.body.data;
    updatedProject.files = updatedProject.files.map((f) =>
      f.name === 'index.html' ? { ...f, content } : f
    );
    console.log(updatedProject.files);

    updatedProject.version += 1;
    await updatedProject.save();
    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating project', error });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, commitMessage: 'Updated project' } },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    updatedProject.version += 1;
    await updatedProject.save();
    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating project', error });
  }
};

const updateImageProject = async (req, res) => {
  try {
    const valid = Project.findById(req.body.params);
    if (!valid) return res.status(404).json({ message: 'Project Not Found' });
    const url = await ImageUpload(req.file);
    if (url.message != 'OK') {
      console.log(url);
      return res.status(400).json({ message: url.message });
    }
    const updateProjectMedia = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { media: url.url } },
      { new: true }
    );
    if (!updateProjectMedia) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: 'success', url: url.url });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Update the user by removing the projectId from the projects array
    await User.updateOne(
      { _id: deletedProject.user },
      { $pull: { projects: req.params.id } }
    );
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting project', error });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectVersionHistory,
  revertProject,
  createProject,
  updateProject,
  deleteProject,
  updateComponents,
  updateImageProject,
};
