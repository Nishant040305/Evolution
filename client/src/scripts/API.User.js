import axios from 'axios';
import server from '../server.json';
class User {
  constructor(id) {
    this.id = id;
    this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;
  }

  // Method to fetch all projects for this user
  async getAllUsersProject() {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/user/${this.id}/project`
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch user projects');
      }
      const projects = response.data.reverse();
      return projects;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      throw error;
    }
  }
  // Fetch all projects
  async getAllSharedProjects() {
    try {
      let endpoint = `${this.baseURL}${server.User.GetAllSharedProjects}`;
      endpoint = endpoint.replace(':id', this.id);
      const response = await axios.get(endpoint);
      return response.data.reverse();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }
  async FindUserSearch(query) {
    try {
      let endpoint = `${this.baseURL}${server.User.FindUserSearch}`;
      endpoint = endpoint.replace(':query', query);
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }
  async GetFriends(id) {
    try {
      let endpoint = `${this.baseURL}${server.User.GetFriends}`;
      endpoint = endpoint.replace(':id', id);
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }
  async createChat(secondUserId) {
    try {
      let endpoint = `${this.baseURL}${server.User.createChat}`;
      const response = await axios.post(endpoint, { secondUserId });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }
  async getChatsData() {
    try {
      let endpoint = `${this.baseURL}${server.User.getChatsData}`;

      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }
}

export default User;
