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

    // Create a new project
    async createProject(projectData) {
        try {
            const response = await this.api.post(this.endpoints.CreateProject, projectData);
            return response.data;
        } catch (error) {
            console.error("Failed to create project:", error);
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
}

export default ApiDashboard;
