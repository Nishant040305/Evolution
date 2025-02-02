import { useState, useEffect, useRef } from 'react';
import React from 'react';
import components from '../../lib';
import server from '../../server.json';
import axios from 'axios';
import {
  FaToolbox,
  FaTools,
  FaProjectDiagram,
  FaFileAlt,
} from 'react-icons/fa';
import { viewChange } from '../../Store/webElementSlice';
const {
  Button,
  TextArea,
  Label,
  Input,
  Select,
  Div,
  Anchor,
  Article,
  Section,
  Nav,
  Footer,
  Header,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
} = components;
// import { Code, LucideMessageCircle, Palette } from 'lucide-react';
import Code from 'lucide-react/dist/esm/icons/code';
import LucideMessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Palette from 'lucide-react/dist/esm/icons/palette';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, deleteElement } from '../../Store/webElementSlice';
import ImageElement from '../../lib/img.component';
import { useParams } from 'react-router-dom';
import { useCanvasEvents } from '../../hooks/DragDrop';
import ProjectOverview from './ProjectOverview';
import ElementContainer from './ElementContainer';
import MediaSection from './MediaContainer';
import ProjectFileSideBar from './ProjectFileSideBar';
import HoverInfoWrapper from '../utility/toolTip';
import ApiDashboard from '../../scripts/API.Dashboard';
import ChatRightMain from '../SocialSection/ChatRightMain';
const LeftSidebar = ({
  toggleRight,
  setStatusCode,
  toast,
  setId,
  file,
  setFile,
  handleModal,
  handleData,
}) => {
  const { projectID } = useParams();
  const dispatch = useDispatch();

  // States
  const [currentTab, setCurrentTab] = useState('components'); // Track active section
  const [showElements, setShowElements] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Selectors
  const webElements = useSelector((state) => state.webElement.present);
  const imagesMedia = useSelector((state) => state.image);

  // Refs
  const webElementsRef = useRef(webElements);
  const API = new ApiDashboard();
  // Counter logic
  const evalCounter = (webElements) => {
    let val = 0;
    Object.keys(webElements).forEach((key) => {
      const parsedKey = parseInt(key, 10);
      if (!isNaN(parsedKey) && parsedKey >= val) {
        val = parsedKey + 1;
      }
    });
    console.log('COUNTER', val);
    return val;
  };
  const [counter, setCounter] = useState(evalCounter(webElements));
  const handleDelete = (id) => {
    dispatch(deleteElement(id));
  };
  const { canvasEvents } = useCanvasEvents(setId, toggleRight, webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);
  const fetchFiles = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
      const sortedFiles = projectComp.files.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return sortedFiles;
    } catch (error) {
      toast.error('Failed to fetch project files.');
    }
  };
  const handleJavaScript = async () => {
    let data = await fetchFiles();
    console.log(data);
    if (data !== null) {
      data = data.filter((f) => f.name.endsWith('.js'));
    }
    handleModal(true);
    handleData(data);
  };
  const handleCSS = async () => {
    let data = await fetchFiles();
    console.log(data);
    if (data !== null) {
      data = data.filter((f) => f.name.endsWith('.css'));
    }
    handleModal(true);
    handleData(data);
  };

  const sidebarElements = {
    Button: (hash) => Button(hash, canvasEvents),
    TextField: (hash) => TextArea(hash, canvasEvents),
    Dropdown: (hash) =>
      Select(
        hash,
        [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        canvasEvents
      ),
    Label: (hash) => Label(hash, 'New Label Text', canvasEvents),
    Input: (hash) => Input(hash, canvasEvents),
    Div: (hash) => Div(hash, canvasEvents),
    Anchor: (hash) => Anchor(hash, canvasEvents),
    Article: (hash) => Article(hash, canvasEvents),
    Section: (hash) => Section(hash, canvasEvents),
    Nav: (hash) => Nav(hash, canvasEvents),
    Footer: (hash) => Footer(hash, canvasEvents),
    Header: (hash) => Header(hash, canvasEvents),
    H1: (hash) => H1(hash, canvasEvents),
    H2: (hash) => H2(hash, canvasEvents),
    H3: (hash) => H3(hash, canvasEvents),
    H4: (hash) => H4(hash, canvasEvents),
    H5: (hash) => H5(hash, canvasEvents),
    H6: (hash) => H6(hash, canvasEvents),
    Paragraph: (hash) => Paragraph(hash, canvasEvents),
  };

  const sidebarMedia = {
    ImageElement: (hash, image) =>
      ImageElement(hash, image, 'Image', canvasEvents),
  };

  const handleMouseMove = (event) => {
    const { clientX } = event;
    if (clientX <= 50) {
      setIsVisible(true); // Show sidebar when mouse is near the left edge
    }
  };

  const handleSidebarLeave = () => {
    setIsVisible(false); // Hide sidebar when mouse leaves
  };
  const handleViewChange = (id, view) => {
    console.log(id, view);
    dispatch(viewChange({ id: id, view: view }));
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const chats = useSelector((state) => state.chat.chats);
  const userId = useSelector((state) => state.user.userInfo._id);
  const chatNotif = chats.reduce(
    (sum, chat) => sum + (chat.unread_messages?.[userId] || 0),
    0
  );
  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={handleSidebarLeave}
    >
      {/* Sidebar logic */}
      <div
        className={`fixed top-0 left-0 bottom-0  bg-gray-100 border-r border-gray-300 transition-transform duration-300 transform ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        } z-10`}
      >
        <div className={`flex flex-col   h-full w-80`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-red-50">
            <div className="flex w-full justify-between">
              <HoverInfoWrapper info="Components" position={'bottom'}>
                <button
                  onClick={() => setCurrentTab('components')}
                  className={`px-4 py-1.5 rounded-md transition-all mr-1 ${
                    currentTab === 'components'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <FaTools className="w-4 h-4" />
                </button>
              </HoverInfoWrapper>

              <HoverInfoWrapper info="Project Overview" position={'bottom'}>
                <button
                  onClick={() => setCurrentTab('project')}
                  className={`px-4 py-1.5 rounded-md transition-all mr-1 ${
                    currentTab === 'project'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <FaProjectDiagram className="w-4 h-4" />
                </button>
              </HoverInfoWrapper>
              <HoverInfoWrapper info="Files" position={'bottom'}>
                <button
                  onClick={() => setCurrentTab('files')}
                  className={`px-4 py-1.5 rounded-md transition-all ${
                    currentTab === 'files'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <FaFileAlt className="w-4 h-4" />
                </button>
              </HoverInfoWrapper>
              <HoverInfoWrapper info="Chats" position={'bottom'}>
                <button
                  onClick={() => setCurrentTab('chats')}
                  className={`px-4 py-1.5 rounded-md transition-all mr-1 ${
                    currentTab === 'chats'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <LucideMessageCircle className="w-4 h-4" />
                  {chatNotif > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
                  )}
                </button>
              </HoverInfoWrapper>
            </div>
          </div>

          {/* Content */}
          <div
            className={`${currentTab != 'chats' ? 'flex-1 p-4 space-y-6  overflow-y-auto' : 'h-full'} `}
          >
            {currentTab === 'components' ? (
              <>
                {/* Elements Section */}
                <ElementContainer
                  showElements={showElements}
                  setShowElements={setShowElements}
                  sidebarElements={sidebarElements}
                  setStatusCode={setStatusCode}
                  dispatch={dispatch}
                  counter={counter}
                  setCounter={setCounter}
                  addElement={addElement}
                />
                {/* Media Section */}
                <MediaSection
                  sidebarMedia={sidebarMedia}
                  projectID={projectID}
                  setCounter={setCounter}
                  counter={counter}
                  toast={toast}
                  imagesMedia={imagesMedia}
                />
                {/* Additional Sections */}
                {file.name.endsWith('.html') && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleJavaScript()}
                      className="flex items-center w-full px-4 py-2 space-x-2 text-gray-700 transition-all rounded-lg hover:bg-red-50"
                    >
                      <Code className="w-4 h-4" />
                      <span>Include: JavaScript Files</span>
                    </button>

                    <button
                      onClick={() => handleCSS()}
                      className="flex items-center w-full px-4 py-2 space-x-2 text-gray-700 transition-all rounded-lg hover:bg-red-50"
                    >
                      <Palette className="w-4 h-4" />
                      <span>Include: CSS Files</span>
                    </button>
                  </div>
                )}
              </>
            ) : currentTab === 'project' ? (
              // Project Overview
              <ProjectOverview
                webElements={webElements}
                setId={setId}
                toggleRight={toggleRight}
                setStatusCode={setStatusCode}
                handleDelete={handleDelete}
                handleViewChange={handleViewChange}
              />
            ) : currentTab === 'chats' ? (
              <ChatRightMain toast={toast} mode={'disable'} />
            ) : (
              <ProjectFileSideBar file={file} setFile={setFile} toast={toast} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
