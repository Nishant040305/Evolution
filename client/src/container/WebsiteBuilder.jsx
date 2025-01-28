import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import TopBar from '../components/MainPage/Topbar';
import LeftSidebar from '../components/MainPage/LeftSidebar';
import MainCanvas from '../components/MainPage/MainCanvas';
import RightSidebar from '../components/MainPage/RightSidebar';
import BottomBar from '../components/MainPage/BottomBar';
import CodeEditorJS from '../components/MainPage/CodeEditorJS';
import CodeEditorCSS from '../components/MainPage/CodeEditorCSS';

import SelectModal from '../components/utility/SelectModal';
import ApiDashboard from '../scripts/API.Dashboard';

import { useCanvasEvents } from '../hooks/DragDrop';
import { useReloadEvents } from '../hooks/useReloadEvents';
import { useFileHandler } from '../hooks/useFileHandler';
import { useProjectData } from '../hooks/useProjectData';
import { setPresentChat } from '../Store/Chat';

const WebsiteBuilder = () => {
  const { projectID } = useParams();
  const userId = useSelector(state=>state.user.userInfo._id);
  const project = useSelector(state=>state.project);
  const [showModal, setShowModal] = useState(false);
  const webElement = useSelector((state) => state.webElement.present);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  const [text, setText] = useState('');
  const [id, setId] = useState(0);
  const [file, setFile] = useState({
    name: 'index.html',
    components: false,
    useDefault: true,
  });
  const [ScreenSize, setScreenSize] = useState('desktop');
  const [handleData, setHandleData] = useState(null);
  const { canvasEvents } = useCanvasEvents(
    setId,
    setRightSidebarOpen,
    webElement
  );
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

  const setIncludes = (options) => {
    if (file.name.endsWith('.html')) {
      if (options.length === 0) return;
      if (options[0].endsWith('.js')) {
        API.updateProjectFile(projectID, file.name, { scripts: options });
      } else if (options[0].endsWith('.css')) {
        API.updateProjectFile(projectID, file.name, { styles: options });
      }
    }
  };

  const { reloadEvents } = useReloadEvents(webElement, canvasEvents);

  // Fetch project data
  useProjectData(setFile, projectID, reloadEvents);

  // Load file editor
  useFileHandler(
    file,
    getDefaultComponents,
    setText,
    setRightSidebarOpen,
    setStatusCode
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPresentChat({chatId:project.groupChatId,userId:userId}))
  },[project,userId,dispatch])
  return (
    <div className="flex flex-col h-screen">
      <TopBar
        setScreenSize={setScreenSize}
        toast={toast}
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
        {showModal && (
          <SelectModal
            handleClose={() => setShowModal(false)}
            handleSelect={setIncludes}
            options={handleData}
            selectOption={'multiple'}
          />
        )}
        {statusCode == 0 ? (
          <MainCanvas
            file={file}
            ScreenSize={ScreenSize}
            reloadEvents={reloadEvents}
            rightSidebarOpen={rightSidebarOpen}
            toast={toast}
          />
        ) : statusCode == 1 ? (
          <CodeEditorJS js={text} setJs={setText} file={file} />
        ) : statusCode == 2 ? (
          <CodeEditorCSS css={text} setCss={setText} file={file} />
        ) : (
          // Default case, to be modified later
          <MainCanvas
            ScreenSize={ScreenSize}
            reloadEvents={reloadEvents}
            rightSidebarOpen={rightSidebarOpen}
            toast={toast}
          />
        )}
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => {
              console.log('hey');
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
