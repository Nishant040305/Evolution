import React, { useEffect, useState, useRef, useMemo} from "react";
import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";
import { useSelector,useDispatch } from "react-redux";
import { setElement } from "../Store/webElementSlice";
import { useNavigate, useParams } from "react-router-dom";
import ApiDashboard from "../scripts/API.Dashboard";

const WebsiteBuilder = () => {
  const {userId,projectID} = useParams();
  const navigate = useNavigate();
  const webElement = useSelector(state=>state.webElement.present);
  const currentUserId = useSelector((state) => state.user.userInfo?._id); // Current logged-in user's ID
  console.log(webElement)
  const dispatch = useDispatch();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [id,set] = useState(0);
  const webElementRef = useRef(webElement); // Create a ref for the last webElement
  const setId=(id)=>{
    //middleWare for setId
    if(webElement[id]==null){

      setRightSidebarOpen(false);
      set(0);
    }else{
      set(id)
    }
  }
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
            dispatch(setElement(projectComp.components))
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
          setId={setId}
        />
        <MainCanvas
         />
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => setRightSidebarOpen(false)}
          id={id}
          />
        )}
      </div>
      <BottomBar/>
    </div>
  );
};

export default WebsiteBuilder;
