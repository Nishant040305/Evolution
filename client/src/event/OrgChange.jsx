import  { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { socket } from "../scripts/socket";
import { updateOrganizations } from "../Store/Organization";

export const useSocketOrganizationChanges = () => {
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!x) return;
    socket.on("organizationChanges",(data)=>{
        //data processing in future
        console.log("organization changes");
        dispatch(updateOrganizations());
    })
    return () => {
      socket.off("organizationChanges");
    };
  }, [dispatch,socket,user]);
};