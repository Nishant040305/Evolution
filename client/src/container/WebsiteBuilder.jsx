import React, { useEffect, useState ,useMemo} from "react";
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
  const [webElements,setWebElements] = useState({});
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [id,setId] = useState(0);
  /* SHIVAM DEKH LENA
      MAI COMMIT KAR RHA HU 
      branch mai
      baki maine implement kardiya baki sab thoda dekhna hai
      errors
  */ 
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
        console.log("Project:", projectComp);

        if (!didCancel) {
          if (!projectComp || projectComp.user._id !== currentUserId || currentUserId !== userId) {
            navigate('/'); // Redirect if unauthorized
          } else {
            // Only update state if there's a real change
            setWebElements((prev) => {
              const newComponents = projectComp.components || {};
              return JSON.stringify(prev) !== JSON.stringify(newComponents) ? newComponents : prev;
            });
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

  useEffect(() => {
    if (webElements && Object.keys(webElements).length > 0) {
      if (JSON.stringify(webElements) !== JSON.stringify(webElement)) {
        dispatch(setElement(webElements));
      }
    }
  }, [webElements, dispatch, webElement]);

  // Sync local state with Redux store only when necessary
  useEffect(() => {
    if (webElement && JSON.stringify(webElement) !== JSON.stringify(webElements)) {
      setWebElements(webElement);
    }
  }, [webElement, webElements]);


  
    return (
    <div className="flex flex-col h-screen">
      <TopBar webElements={webElements}
          setWebElements = {setWebElements}/>
      <div className="flex flex-1">
        <LeftSidebar
          sidebarOpen={leftSidebarOpen}
          toggleRight={setRightSidebarOpen}
          toggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
          handleElementSelect={handleElementSelect}
          webElements={webElements}
          setWebElements = {setWebElements}
          id={id}
          setId={setId}
        />
        <MainCanvas
        webElements={webElements}
        setWebElements = {setWebElements}
         />
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => setRightSidebarOpen(false)}
            webElements={webElements}
          setWebElements = {setWebElements}
          id={id}
          />
        )}
      </div>
      <BottomBar
      webElements={webElements}
      setWebElements = {setWebElements}
      />
    </div>
  );
};

export default WebsiteBuilder;
