import { useEffect } from "react";
import User from "../scripts/API.User";
import { useSelector,useDispatch } from "react-redux";
import { setChats } from "../Store/Chat";
export const LoadChats = ()=>{
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.userInfo);
    const chats = useSelector(state=>state.chat.chats)
      useEffect(() => {

        if(!isAuthenticated) return;
        const API = new User(user._id);
        const fetchChats = async () => {
          try {
            const response = await API.getChatsData();
            if (response.success) {
              console.log(response.data);
              dispatch(setChats(response.data));
            } else {
              console.error('Error fetching chats:', response.error);
            }
          } catch (error) {
            console.error('Error fetching chats:', error);
          } 
        };
        if(chats.length==0){
          fetchChats();
        }
      }, [isAuthenticated,dispatch]);    
}
