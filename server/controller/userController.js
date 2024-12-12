const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const {searchUsers} = require('../utils/searchUser');
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

const getAllSharedProjects = async (req, res) => {
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

        // Retrieve all shared projects associated with the user
        const projects = await Promise.all(user.sharedProjects.map(projectId => Project.findById(projectId)));
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return res.status(500).json({ message: 'Error retrieving projects', error });
    }
};
const ChangeProfile = async (req,res)=>{
    try{
        const userId = req.params.id;
        const {username,avatar} = req.body;
        if(!username||!avatar){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.username = username;
        user.avatar = avatar;
        await user.save();
        return res.status(200).json({message:"Profile updated successfully"})
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}       
const FindUserEmail = async (req,res)=>{
    try{
        const userId = req.params.email;
        const user = await User.findOne({email:userId});
        if(!user){
            return res.status(404).json(null)
        }
        return res.status(200).json({
            displayname:user.displayname,
            _id:user._id,
            avatar:user.avatar,
            email:user.email,
        })
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const FindUserByID = async (req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json(null)
        }
        return res.status(200).json({
            displayname:user.displayname,
            _id:user._id,
            avatar:user.avatar,
            email:user.email,
        })
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const FindUserSearch =async(req,res)=> {
    const query = req.params.query;
    try {
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
      }
      const users = await searchUsers(query);
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error searching users.' });
    }
};

module.exports = {
    getAllUserProjects,
    getAllSharedProjects,
    ChangeProfile,
    FindUserEmail,
    FindUserByID,
    FindUserSearch
};
