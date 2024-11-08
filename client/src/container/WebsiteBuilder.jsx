import React, { useEffect, useState, useRef, useMemo} from "react";
import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";
import { useSelector,useDispatch } from "react-redux";
import { setElement ,setAttribute,setPosition} from "../Store/webElementSlice";
import { useNavigate, useParams } from "react-router-dom";
import ApiDashboard from "../scripts/API.Dashboard";
import { setData } from "../Store/imageSlice";
import CodeEditorJS from "../components/MainPage/CodeEditorJS";

const WebsiteBuilder = () => {
  const {userId,projectID} = useParams();
  const navigate = useNavigate();
  const webElement = useSelector(state=>state.webElement.present);
  const currentUserId = useSelector((state) => state.user.userInfo?._id); // Current logged-in user's ID
  const dispatch = useDispatch();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [id,set] = useState(0);
  const webElementRef = useRef(webElement); // Create a ref for the last webElement
  const setId=(id)=>{
    //middleWare for setId
    console.log("hey",id)
    let x = parseInt(id);
    if(webElement[x]==null){
      console.log(webElement);
      console.log(x,"not availabe")
      setRightSidebarOpen(false);
      set(0);
    }else{
      console.log(id);
      setRightSidebarOpen(true);
      set(id)
    }
  }
  const startDrag = (event, elementId) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    let startX = event.clientX;
    let startY = event.clientY;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
   
      dispatch(setPosition({id:elementId,dx:dx,dy:dy}))
      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
    };
    const handleClick=(elementId)=>{
      console.log("clicked")
      setId(elementId);
    }
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClick)
  };


  const API = useMemo(() => new ApiDashboard(), []); // Ensure API instance is stable
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleElementSelect = (item, subItem) => {
    setSelectedElement({ main: item, sub: subItem });
    setRightSidebarOpen(true);
  };

  // Fetch project data when projectID or currentUserId changes
  useEffect(() => {
    let didCancel = false;

    const fetchProject = async () => {
      try {
        const projectComp = await API.getProjectById(projectID);
        if (!didCancel) {
          if (!projectComp || projectComp.user._id !== currentUserId || currentUserId !== userId) {
            navigate('/'); // Redirect if unauthorized
          } else {
            dispatch(setElement(projectComp.components));
            dispatch(setData(projectComp.media));
            Object.keys(webElement).forEach((key)=>{
              dispatch(setAttribute(
                {
                  id:key,
                  property:"onMouseDown",
                  value:(event)=> startDrag(event,key)
                }
              ))
              dispatch(setAttribute(
                {
                  id:key,
                  property:"onClick",
                  value:()=>setId(key)
                }
              ))
            })
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        if (!didCancel) navigate('/'); // Navigate away in case of error
      }
    };

    if (projectID && currentUserId) {
      fetchProject();
    }

    return () => {
      didCancel = true; // Clean up to avoid setting state on unmounted component
    };
  }, [projectID, currentUserId, userId, API, navigate]);
  
    return (
    <div className="flex flex-col h-screen">
      <TopBar/>
      <div className="flex flex-1">
        <LeftSidebar
          sidebarOpen={leftSidebarOpen}
          toggleRight={setRightSidebarOpen}
          toggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
          handleElementSelect={handleElementSelect}
          id={id}
          setId={set}
        />
        {/* <MainCanvas
         /> */}
         {/* <CodeEditorJS></CodeEditorJS> */}
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => {
              console.log("hey")
              setRightSidebarOpen(false)}}
          id={id}
          />
        )}
      </div>
      <BottomBar/>
    </div>
  );
};

export default WebsiteBuilder;
