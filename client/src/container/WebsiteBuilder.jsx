import React, { useEffect, useState, useRef, useMemo } from "react";
import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";
import { useSelector, useDispatch } from "react-redux";
import {
  setElement,
  setAttribute,
  setPosition,
} from "../Store/webElementSlice";
import { setProject } from "../Store/projectSlice";
import { useNavigate, useParams } from "react-router-dom";
import ApiDashboard from "../scripts/API.Dashboard";
import { setData } from "../Store/imageSlice";
import CodeEditorJS from "../components/MainPage/CodeEditorJS";
import CodeEditorCSS from "../components/MainPage/CodeEditorCSS";
import { useCanvasEvents } from "../hooks/DragDrop";
import { toast } from "react-toastify";
const WebsiteBuilder = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const webElement = useSelector((state) => state.webElement.present);
  const [reloaded, setReloaded] = useState(false);
  const dispatch = useDispatch();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  const [css, setCss] = useState("/* Write your CSS code here... */");
  const [js, setJs] = useState("// Write your JS code here...");
  const [id, set] = useState(0);
  const [ScreenSize, setScreenSize] = useState("desktop");
  const webElementRef = useRef(webElement); // Create a ref for the last webElement
  const setId = (id) => {
    //middleWare for setId
    console.log("hey", id);
    let x = parseInt(id);
    if (webElement[x] == null) {
      console.log(webElement);
      console.log(x, "not availabe");
      setRightSidebarOpen(false);
      set(0);
    } else {
      console.log(id);
      setRightSidebarOpen(true);
      set(id);
    }
  };

  const { canvasEvents } = useCanvasEvents(
    set,
    setRightSidebarOpen,
    webElement
  );

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

  const reloadEvents = () => {
    console.log("HERE", webElement);
    Object.keys(webElement).forEach((key) => {
      const events = canvasEvents(key);
      console.log("HERE", events);
      Object.keys(events).forEach((event) => {
        console.log(id, event, events[event]);
        dispatch(
          setAttribute({
            id: key,
            property: event,
            value: events[event],
          })
        );
      });
    });
  };

  const fetchProject = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
     
        console.log(projectComp);
        dispatch(setElement(projectComp.components));
        dispatch(setData(projectComp.media));
        dispatch(setProject(projectComp));
        setCss(projectComp.cssContent || "/* Write your CSS code here... */");
        setJs(projectComp.javascriptContent || "// Write your JS code here...");

        console.log(webElement);
        reloadEvents();
        console.log(webElement);
      
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    if (projectID) {
      fetchProject();
    }
  }, [projectID]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        setScreenSize={setScreenSize}
        css={css}
        js={js}
        setStatusCode={setStatusCode}
      />
      <div className="flex flex-1">
        <LeftSidebar
          toggleRight={setRightSidebarOpen}
          setStatusCode={setStatusCode}
          setId={set}
          toast={toast}
        />
        {statusCode == 0 ? (
          <MainCanvas ScreenSize={ScreenSize} reloadEvents={reloadEvents} toast={toast}  />
        ) : statusCode == 1 ? (
          <CodeEditorJS js={js} setJs={setJs} />
        ) : statusCode == 2 ? (
          <CodeEditorCSS css={css} setCss={setCss} />
        ) : (
          <MainCanvas ScreenSize={ScreenSize} reloadEvents={reloadEvents} toast={toast} />
        )}
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => {
              console.log("hey");
              setRightSidebarOpen(false);
            }}
            toast={toast}
            id={id}
          />
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default WebsiteBuilder;
