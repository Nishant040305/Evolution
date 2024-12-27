const Porject = require('../models/Project');
module.exports = (io,socket) => {
    //organization changes
    socket.on('organizationChanges',async(data)=>{
        try{
            const project = await Porject.findById(data);
            if(!project){
                return;
            }
            const id = project.groupChatId.toString();
            io.to(id).emit('organizationChanges',project._id);
        }catch(error){
            console.log(error);
        }
    })

    //collaborator added
    socket.on('collaboratorAdded', async (data) => {
        try {
            const { chatId, userId } = data;
            console.log("Collaborator Added",chatId,userId);
            io.to(chatId).emit('collaboratorAdded', data);
        } catch (error) {
            console.error('Error adding collaborator:', error);
            socket.emit('error', 'Failed to add collaborator');
        }
    });

    //collaborator removed
    socket.on('collaboratorRemoved', async (data) => {
        try {
            const { chatId, userId } = data;
            console.log("Collaborator Removed",chatId,userId);
            io.to(chatId).emit('collaboratorRemoved', data);
        } catch (error) {
            console.error('Error removing collaborator:', error);
            socket.emit('error', 'Failed to remove collaborator');
        }
    });
    // Information about project changed
    socket.on('projectInfoChanged', async (data) => {
        try {
            const { chatId, projectInfo } = data;
            console.log("Project Info Changed",chatId,projectInfo);
            io.to(chatId).emit('projectInfoChanged', data);
        } catch (error) {
            console.error('Error changing project info:', error);
            socket.emit('error', 'Failed to change project info');
        }
    });
    // roles changed
    socket.on('rolesChanged', async (data) => {
        try {
            const { chatId, roles } = data;
            console.log("Roles Changed",chatId,roles);
            io.to(chatId).emit('rolesChanged', data);
        } catch (error) {
            console.error('Error changing roles:', error);
            socket.emit('error', 'Failed to change roles');
        }
    });
    socket.on('sendCollaborationRequest', async (data) => {
        try {
            const { chatId, userId } = data;
            console.log("Send Collaboration Request",chatId,userId);
            io.to(chatId).emit('sendCollaborationRequest', data);
        } catch (error) {
            console.error('Error sending collaboration request:', error);
            socket.emit('error', 'Failed to send collaboration request');
        }
    });
    socket.on("acceptCollaborator", async (data) => {
        try {
            const { chatId, userId } = data;
            console.log("Accept Collaborator",chatId,userId);
            io.to(chatId).emit("acceptCollaborator", data);
        } catch (error) {
            console.error("Error accepting collaborator:", error);
            socket.emit("error", "Failed to accept collaborator");
        }
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
};