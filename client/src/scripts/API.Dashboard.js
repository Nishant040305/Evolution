import axios from 'axios';
import serverConfig from '../server.json';

class ApiDashboard {
    constructor(baseURL) {
        this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;
        this.endpoints = serverConfig.Project;
        // Create an axios instance with the base URL
        this.api = axios.create({
            baseURL: this.baseURL,
        });
    }

    // Fetch all projects
    async getAllProjects() {
        try {
            const response = await axios.get(`${this.baseURL}${this.endpoints.GetAllProject}`);
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
            const response = await axios.get(`${this.baseURL}${endpoint}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch project with ID ${id}:`, error);
            throw error;
        }
    }

    // Create a new project
    async createProject(projectData) {

        try {
            console.log(`${this.baseURL}${this.endpoints.CreatProject}`)
            console.log(this.endpoints)
            const response = await axios.post(`${this.baseURL}${this.endpoints.CreatProject}`, projectData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Failed to create project:", error);
            throw error;
        }
    }

    // Update a project's components by ID
    async updateProjectComponents(id, components) {
        const endpoint = this.endpoints.UpdateProjectComponents.replace(':id', id);
        try {
            const response = await this.api.put(endpoint, components);
            return response.data;
        } catch (error) {
            console.error(`Failed to update project components with ID ${id}:`, error);
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
    async publishProject(id, htmlContent, style_css, script_js) {
        const endpoint = this.endpoints.PublishProject.replace(':id', id);
        try {
            const response = await axios.post(`${this.baseURL}${endpoint}`, { id, htmlContent, style_css, script_js });
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
            const response = await axios.get(`${this.baseURL}${endpoint}`, {
                responseType: 'blob' // Set response type to 'blob' to handle binary data
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to download project with ID ${id}:`, error);
            throw error;
        }
    }
    async FindUserByEmail(email) {
        // const endpoint = this.endpoints.FindUserEmail.replace(':email', email);
        // console.log(endpoint)
        try {
            // const response = await axios.get(`${this.baseURL}${endpoint}`);
            console.log(`${this.baseURL}/user/${email}`);
            const response = await axios.get(`${this.baseURL}/api/user/${email}`)
            return response.data;
        } catch (error) {
            console.error(`Failed to find user by email ${email}:`, error);
            throw error;
        }
    }
    async inviteCollaborator(projectId, role, userId) {
        // const endpoint = this.endpoints.InviteCollaborator.replace(':id', projectId);
        // console.log(endpoint)
        try {
            const response = await axios.post(`${this.baseURL}/api/project/${projectId}/invite`, { role, userid:userId });
            return response.data;
        } catch (error) {
            console.error(`Failed to invite collaborator to project ${projectId}:`, error);
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
}

export default ApiDashboard;
