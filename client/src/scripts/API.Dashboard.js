import axios from 'axios';
import serverConfig from '../server.json';

class ApiDashboard {
    constructor(baseURL) {
        this.baseURL = baseURL || import.meta.env.VITE_REACT_APP_BACKWEB;
        this.endpoints = serverConfig.Project;
        // Create an axios instance with the base URL
        this.api = axios.create({
            baseURL: this.baseURL,
        });
    }

    // Fetch all projects
    async getAllProjects() {
        try {
            const response = await this.api.get(this.endpoints.GetAllProject);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }

    // Fetch a project by ID
    async getProjectById(id) {
        const endpoint = this.endpoints.GetProjectById.replace(':id', id);
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch project with ID ${id}:`, error);
            throw error;
        }
    }

    // Fetch a project's version history by ID
    async getProjectVersionHistory(id) {
        const endpoint = this.endpoints.GetProjectVersionHistory.replace(':id', id);
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch project version history with ID ${id}:`, error);
            throw error;
        }
    }

    // Revert a project's version history by ID
    async revertProjectVersion(id, version) {
        const endpoint = this.endpoints.RevertProject.replace(':id', id);
        try {
            const response = await this.api.post(endpoint, { version });
            return response.data;
        } catch (error) {
            console.error(`Failed to revert project version with ID ${id}:`, error);
            throw error;
        }
    }

    // Create a new project
    async createProject(projectData) {
        try {
            const response = await this.api.post(this.endpoints.CreatProject, projectData);
            return response.data;
        } catch (error) {
            console.error("Failed to create project:", error);
            throw error;
        }
    }

    // Update a project's components by ID
    async updateProjectComponents(id, components, data) {
        const endpoint = this.endpoints.UpdateProjectComponents.replace(':id', id);
        try {
            const response = await this.api.put(endpoint, { components, data });
            return response.data;
        } catch (error) {
            console.error(`Failed to update project components with ID ${id}:`, error);
            throw error;
        }
    }

    // Create a new project's file by ID
    async createProjectFile(id, file) {
        const endpoint = this.endpoints.ProjectFile.replace(':id', id);
        try {
            const response = await this.api.post(endpoint, file);
            return response.data;
        } catch (error) {
            console.error(`Failed to create project file with ID ${id}:`, error);
            throw error;
        }
    }

    // Delete a project's file by ID and file name
    async deleteProjectFile(id, name) {
        const endpoint = this.endpoints.ProjectFile.replace(':id', id);
        try {
            const response = await this.api.delete(endpoint, { data: { name } });
            return response.data;
        } catch (error) {
            console.error(`Failed to delete project file with ID ${id} and file name ${name}:`, error);
            throw error;
        }
    }

    // Update a project's file by ID and file name
    async updateProjectFile(id, name, data) {
        const endpoint = this.endpoints.ProjectFile.replace(':id', id);
        try {
            const response = await this.api.put(endpoint, { name, data });
            return response.data;
        } catch (error) {
            console.error(`Failed to update project file with ID ${id} and file name ${name}:`, error);
            throw error;
        }
    }

    // Update a project by ID
    async updateProject(id, projectData) {
        const endpoint = this.endpoints.UpdateProject.replace(':id', id);
        try {
            const response = await this.api.put(endpoint, projectData);
            return response.data;
        } catch (error) {
            console.error(`Failed to update project with ID ${id}:`, error);
            throw error;
        }
    }

    // Delete a project by ID
    async deleteProject(id) {
        const endpoint = this.endpoints.DeleteProject.replace(':id', id);
        try {
            const response = await this.api.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to delete project with ID ${id}:`, error);
            throw error;
        }
    }

    // Publish a project by ID
    async publishProject(id) {
        const endpoint = this.endpoints.PublishProject.replace(':id', id);
        try {
            const response = await this.api.post(endpoint, { id });
            return response.data;
        } catch (error) {
            console.error(`Failed to publish project with ID ${id}:`, error);
            throw error;
        }
    }

    // Download a project by ID
    async downloadProject(id) {
        const endpoint = this.endpoints.DownloadProject.replace(':id', id);
        try {
            const response = await this.api.get(endpoint, {
                responseType: 'blob' // Set response type to 'blob' to handle binary data
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to download project with ID ${id}:`, error);
            throw error;
        }
    }

    // TODO: add these to server.json
    async FindUserByEmail(email) {
        try {
            const response = await axios.get(`${this.baseURL}/api/user/${email}`)
            if(response.status==200) return response.data;
            else{
                return null;
            }
        } catch (error) {
            console.error(`Failed to find user by email ${email}:`, error);
            throw error;
        }
    }
    async FindUserByID(ID) {
        try {
            // const response = await axios.get(`${this.baseURL}${endpoint}`);
            console.log(`${this.baseURL}/user/${ID}`);
            const response = await axios.get(`${this.baseURL}/api/user/ID/${ID}`)
            if(response.status==200) return response.data;
            else{
                return null;
            }
        } catch (error) {
            console.error(`Failed to find user by email ${ID}:`, error);
            throw error;
        }
    }
    async inviteCollaborator(projectId, role, userId) {
        try {
            const response = await axios.post(`${this.baseURL}/api/project/${projectId}/invite`, { role, userid:userId });
            return response.data;
        } catch (error) {
            console.error(`Failed to invite collaborator to project ${projectId}:`, error);
            throw error;
        }
    }
    async acceptCollaboration(projectId, userId) {
        try {
            console.log(projectId,userId)
            const response = await axios.post(`${this.baseURL}/api/project/${projectId}/collaboration`, { userid: userId });
            return response.data;
        } catch (error) {
            console.error(`Failed to accept collaboration request for project ${projectId}:`, error);
            throw error;
        }
    }
    async DeleteCollaborator(projectId, userId) {
        try {
            const response = await axios.delete(`${this.baseURL}/api/project/${projectId}/member`,{ data: { userid: userId } } );
            return response.data;
        } catch (error) {
            console.error(`Failed to delete collaborator from project ${projectId}:`, error);
            throw error;
        }
    }      
    async UpdateCollaboratorRole(projectId, userId, role) {
        try {
            const response = await axios.put(`${this.baseURL}/api/project/${projectId}/member`,{ userid: userId, role });
            return response.data;
        } catch (error) {
            console.error(`Failed to update collaborator role in project ${projectId}:`, error);
            throw error;
        }
    }       
}

export default ApiDashboard;
