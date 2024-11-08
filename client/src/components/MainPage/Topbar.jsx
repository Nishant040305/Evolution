import React from "react";
import { Undo, Redo, Monitor, Tablet, Smartphone } from "lucide-react";
import { ActionCreators } from 'redux-undo';
import { useDispatch } from "react-redux";
import ApiDashboard from "../../scripts/API.Dashboard";
import { useSelector } from "react-redux";

const TopBar = () => {
  const webElements = useSelector(state=>state.webElement.present);
  const dispatch = useDispatch();
  const handleUndo = () => {
    dispatch(ActionCreators.undo())
  };
  const handleRedo = () => dispatch(ActionCreators.redo());
  const apiDashboard = new ApiDashboard();

  const getProjectId = () => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    return id;
  }

  const getHTMLContent = () => {
    let htmlContent = document.getElementById("canvas").innerHTML;

    htmlContent = htmlContent
      .replace(/draggable="true"/g, "") 
      .replace(
        /(id="canvas-element (\d+)")/g,
        (match, p1, p2) => {
          if (webElements[p2].HTMLAttributes === undefined) {
            console.log(p1, "HTML ATTRIBUTES NOT FOUND")
            return match;
          }
          return `${p1} ` +
           Object.keys(webElements[p2].HTMLAttributes)
            .map(key => `${key}="${webElements[p2].HTMLAttributes[key]}"`).join(" ");
        }
    );

    console.log(htmlContent);

    return htmlContent;
  }

  const preview = () => {
    const htmlContent = getHTMLContent();
    
    const blob = new Blob([htmlContent], { type: 'text/html' });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank", "Preview");

    URL.revokeObjectURL(url);
  };

  const download = () => {
    const htmlContent = getHTMLContent();

    const blob = new Blob([htmlContent], { type: 'text/html' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = 'canvas.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
  };

  const publish = async () => {
    const htmlContent = getHTMLContent();
    const id = getProjectId();

    try {
      const res = await apiDashboard.publishProject(id, htmlContent);
      console.log(res);
      window.open(`${import.meta.env.VITE_REACT_APP_BACKWEB}/${res.data.domain}`,"_blank"); 
    } catch (error) {
      console.error("Failed to publish content:", error);
      alert("Failed to publish content. Please try again.");
    }
  };

  return (
  <div className="flex items-center justify-between px-4 bg-white border-b h-14">
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-semibold text-rose-800">Evolution</h1>
      <div className="flex space-x-2">
        <button className="p-2 rounded-lg hover:bg-rose-50" onClick={()=>{
          handleUndo();
        }}>
          <Undo className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-rose-50" onClick={()=>{
          handleRedo();
        }}>
          <Redo className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex p-1 border rounded-lg bg-rose-50">
        <button className="p-1 rounded hover:bg-white">
          <Monitor className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-white">
          <Tablet className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-white">
          <Smartphone className="w-4 h-4" />
        </button>
      </div>
      <button 
        className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800"
        onClick={preview}
   >
        Preview
      </button>
      <button 
        className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800"
        onClick={download}
  >
        Download
      </button>
      <button 
        className="px-3 py-1.5 bg-rose-800 text-white rounded-lg hover:bg-rose-900"
        onClick={publish}
      >
        Publish
      </button>
    </div>
  </div>
  )
}

export default TopBar;
