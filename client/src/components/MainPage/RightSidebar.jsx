import React from "react";
import { X ,ChartColumn} from "lucide-react";
import ComponentEditor from "./componentEditor";
import ComponentEditorTransform from "./ComponentEditorTransform";
import Info from "./Info";
import ComponentEditorAppearance from "./ComponentEditorAppearance";
import ComponentEditorAdvanced from "./ComponentEditorAdvanced";
import ComponentEditorContent from "./ComponentEditorContent";
import { useSelector } from "react-redux";
const RightSidebar = ({ closeSidebar,id}) => {
  console.log(id);
  const webElements = useSelector(state=>state.webElement.present);
  let idx = id;
  if(webElements[id]==null){
    idx = 0;
  }
  return(
  <div className={`w-64 transition-all flex flex-col duration-300 border-l bg-gray-50 overflow-hidden`}>
    <div className="properties-section flex flex-row justify-between px-2 pt-2 border-b border-slate-200 py-3"><div className="flex flex-row"><ChartColumn size={25} color="#000" />Properties</div><X onClick={()=>{closeSidebar(false)}}></X></div>
    <div className="p-1">
      {id!=0?<div><Info id={idx}></Info>
      <ComponentEditorTransform id={idx}></ComponentEditorTransform>
      <ComponentEditorAppearance id={idx} ></ComponentEditorAppearance>
      <ComponentEditorAdvanced id={idx}></ComponentEditorAdvanced>
      <ComponentEditorContent id={idx} />
      </div>:<></>}
    </div>
  </div>)};

export default RightSidebar;
