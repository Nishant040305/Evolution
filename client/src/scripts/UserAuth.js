import axios from "axios";
import server from "../server.json";

export const UserVerify = async () => {
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.get(`${BACKWEB}${server.Auth.verify}`, {
            headers: {
                'Accept': 'application/json',
            },
            mode: "cors",
            withCredentials: true
        });
        
        if (response.status === 200) {
            const userInfo = response.data.info;
            return userInfo; // Return the userInfo object directly
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};
