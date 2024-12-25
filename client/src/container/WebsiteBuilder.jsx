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
import SelectModal from "../components/utility/SelectModal";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
const WebsiteBuilder = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const webElement = useSelector((state) => state.webElement.present);
  const [reloaded, setReloaded] = useState(false);
  const dispatch = useDispatch();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  const [text, setText] = useState("");
  const [id, set] = useState(0);
  const [selectedFileFromModal, setSelectedFileFromModal] = useState(null);
  const [file, setFile] = useState({
    name: "index.html",
    components: false,
    useDefault: true,
  });
  const [ScreenSize, setScreenSize] = useState("desktop");
  const [handleData, setHandleData] = useState(null);
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

  const getDefaultComponents = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
      return projectComp?.components;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const fetchProject = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
     
        console.log(projectComp);
        dispatch(setElement(projectComp.components));
        dispatch(setData(projectComp.media));
        dispatch(setProject(projectComp));
        setFile(projectComp.files.find((f) => f.name === "index.html"));
        console.log(file);

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

  useEffect(() => {
    // load file editor
    if (file.name.endsWith(".html")) setStatusCode(0);
    else if (file.name.endsWith(".css")) setStatusCode(2);
    else if (file.name.endsWith(".js")) setStatusCode(1);
    else setStatusCode(3);

    // load file
    if (file.useDefault) {
      getDefaultComponents().then((components) => {
        dispatch(setElement(components));
        console.log("Loaded default");
      });
    }
    else if (file.name.endsWith(".html")) {
      dispatch(setElement(file.components));
      console.log("Loaded HTML");
      console.log(webElement);
    }
    else {
      setText(file.content);
      console.log("Loaded text");
    }

    // close right sidebar
    setRightSidebarOpen(false);
  }, [file])

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        setScreenSize={setScreenSize}
        toast = {toast}
        setStatusCode={setStatusCode}
        file={file}
      />
      <div className="flex flex-1">
        <LeftSidebar
          toggleRight={setRightSidebarOpen}
          setStatusCode={setStatusCode}
          setId={set}
          toast={toast}
          file={file}
          setFile={setFile}
          handleModal={setShowModal}
          handleData={setHandleData}
        />
        {showModal&&<SelectModal handleClose={()=>setShowModal(false)} handleSelect={setFile} options={handleData} selectOption={"single"} />}
        {statusCode == 0 ? (
          <MainCanvas ScreenSize={ScreenSize} reloadEvents={reloadEvents} toast={toast}  />
        ) : statusCode == 1 ? (
          <CodeEditorJS js={text} setJs={setText} file={file} />
        ) : statusCode == 2 ? (
          <CodeEditorCSS css={text} setCss={setText} file={file} />
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
