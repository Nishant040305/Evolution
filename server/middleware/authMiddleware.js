const Project = require('../models/Project');

const getMemberRole = async (projectId, userId) => {
    const project = await Project.findById(projectId).populate('members.user members.permissions user');
    if (!project) throw new Error("Project not found");
    const member = project.user._id.toString() === userId 
        ? { user: project.user, role: 'owner' }
        : project.members.find(m => m.user._id.toString() === userId);
    return { project, member };
};

const permissions = {
    viewProject: "VIEW_PROJECT",
    editProject: "EDIT_PROJECT",
    publishProject: "PUBLISH_PROJECT",
    downloadProject: "DOWNLOAD_PROJECT",
    manageProject: "MANAGE_PROJECT",
    deleteProject: "DELETE_PROJECT",
    manageMembers: "MANAGE_MEMBERS",
}

const rolePermissions = (visibility) => {
    return {
        owner: [
            permissions.viewProject,
            permissions.editProject,
            permissions.publishProject,
            permissions.downloadProject,
            permissions.manageProject,
            permissions.deleteProject,
            permissions.manageMembers
        ],
        admin: [
            permissions.viewProject,
            permissions.editProject,
            permissions.publishProject,
            permissions.downloadProject,
            permissions.manageProject,
        ],
        editor: [
            permissions.viewProject,
            permissions.editProject,
            permissions.publishProject,
            permissions.downloadProject
        ],
        viewer: [
            permissions.viewProject
        ],
        default: visibility ? [permissions.viewProject] : []
    }
}
  
const hasPermission = (project, member, permission) => {
    const role = member?.role || 'default';
    console.log(project.name, member.user.displayname, role, permission);
    const auth = (
        role === 'owner' ||
        rolePermissions(project.visibility)[role].includes(permission) || 
        rolePermissions(project.visibility).default.includes(permission) ||
        member.permissions?.includes(permission)
    );
    console.log(auth);
    return auth;
}

const authorize = (permission) => async (req, res, next) => {
    if (!req.params.id) return res.status(400).json({ "errorMessage": "Invalid project ID" });
    if (!req.user?._id) return res.status(401).json({ "errorMessage": "User not verified" });
    try {
        const { project, member } = await getMemberRole(req.params.id, req.user._id);
        if (hasPermission(project, member, permission)) {
            next();
        } else {
            res.status(403).json({ "errorMessage": "Insufficient permissions" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "errorMessage": "Internal Server Error" });
    }
};

module.exports = {
    permissions,
    authorize,
}