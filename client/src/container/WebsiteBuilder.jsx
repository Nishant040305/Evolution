import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";
import CodeEditorJS from "../components/MainPage/CodeEditorJS";
import CodeEditorCSS from "../components/MainPage/CodeEditorCSS";

import SelectModal from "../components/utility/SelectModal";
import ApiDashboard from "../scripts/API.Dashboard";

import { useCanvasEvents } from "../hooks/DragDrop";
import { useReloadEvents } from "../hooks/useReloadEvents";
import { useFileHandler } from "../hooks/useFileHandler";
import { useProjectData } from "../hooks/useProjectData";

const WebsiteBuilder = () => {
  const { projectID } = useParams();
  const [showModal, setShowModal] = useState(false);
  const webElement = useSelector((state) => state.webElement.present);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  const [text, setText] = useState("");
  const [id, setId] = useState(0);
  const [file, setFile] = useState({ name: "index.html", components: false, useDefault: true });
  const [ScreenSize, setScreenSize] = useState("desktop");
  const [handleData, setHandleData] = useState(null);
  const { canvasEvents } = useCanvasEvents(setId, setRightSidebarOpen, webElement);
  const API = useMemo(() => new ApiDashboard(), []); // Ensure API instance is stable

  const getDefaultComponents = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
      return projectComp?.components;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const reloadEvents = useReloadEvents(webElement, canvasEvents);

  // Fetch project data
  useProjectData(setFile, projectID, reloadEvents);

  // Load file editor
  useFileHandler(file, getDefaultComponents, setText, setRightSidebarOpen, setStatusCode);

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
          setId={setId}
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
