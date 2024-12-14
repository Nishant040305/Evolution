import axios from "axios"
import server from "../server.json"
import { Trophy } from "lucide-react";
class Chats {
    constructor(id) {
      this.id = id;
      this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;
    }
    async getChatsData(){
        try{
            let endpoint = `${this.baseURL}${server.Chat.getChatsData}`
            console.log(endpoint)
            const response = await axios.get(endpoint);
            console.log(response.data);
            return response.data;
        }catch(error){
            console.error("Failed to retrieve chat data:", error);
            throw error;
        }
    }async createChat(secondUserId){
        try{
            let endpoint = `${this.baseURL}${server.Chat.createChat}`
            const response = await axios.post(endpoint,{secondUserId});
            return response.data;
        }catch(error){
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }async createGroupChat(chatName,users,groupImage = 'https://res.cloudinary.com/dwj0nj7d6/image/upload/v1731223362/Evolution/sp9gkw5kn8sjxvhju7aq.png'){
        try{
            let endpoint = `${this.baseURL}${server.Chat.createGroupChat}`
            const response = await axios.post(endpoint,{chatName,users,groupImage});
            return response.data;
        }catch(error){
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }async addUserToGroupChat(chatId,userId){
        try{
            let endpoint = `${this.baseURL}${server.Chat.addUserToGroupChat}`
            const response = await axios.post(endpoint,{chatId,userId});
            return response.data;
        }catch(error){
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }async getMessages(chatId,lastSeen){
        try{
            console.log(chatId,lastSeen)
            let endpoint = `${this.baseURL}${server.Chat.getMessages}`
            const response = await axios.post(endpoint,{chatId,lastSeen});
            return response.data;
        }catch(error){
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }async sendMessage(chatId,message){
        try{
            let endpoint = `${this.baseURL}${server.Chat.sendMessage}`
            const response = await axios.post(endpoint,{chatId,message});
            return response.data;
        }catch(error){
            console.error("Failed to fetch projects:", error);
            throw error;
        }
    }
}

export default Chats;