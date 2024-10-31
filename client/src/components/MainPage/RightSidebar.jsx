import React from "react";
import { X ,ChartColumn} from "lucide-react";
import ComponentEditor from "./componentEditor";
import ComponentEditorTransform from "./ComponentEditorTransform";
import Info from "./Info";
import ComponentEditorAppearance from "./ComponentEditorAppearance";
import ComponentEditorAdvanced from "./ComponentEditorAdvanced";
import ComponentEditorContent from "./ComponentEditorContent";
const RightSidebar = ({ closeSidebar,webElements,setWebElements ,id}) => (
  <div className={`w-64 transition-all flex flex-col duration-300 border-l bg-gray-50 overflow-hidden`}>
    <div className="properties-section flex flex-row justify-between px-2 pt-2 border-b border-slate-200 py-3"><div className="flex flex-row"><ChartColumn size={25} color="#000" />Properties</div><X onClick={()=>{closeSidebar(false)}}></X></div>
    <div className="p-1">
      {id!=0?<div><Info id={id} webElements={webElements} setWebElements={setWebElements}></Info>
      <ComponentEditorTransform id={id} webElements={webElements} setWebElements={setWebElements}></ComponentEditorTransform>
      <ComponentEditorAppearance id={id} webElements={webElements} setWebElements={setWebElements}></ComponentEditorAppearance>
      <ComponentEditorAdvanced id={id} webElements={webElements} setWebElements={setWebElements}></ComponentEditorAdvanced>
      <ComponentEditorContent id={id} webElements={webElements} setWebElements={setWebElements}/>
      </div>:<></>}
    </div>
  </div>
);

export default RightSidebar;
