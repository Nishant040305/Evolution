import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute, setContent, setProperty, setHtmlAttributes } from "../../Store/webElementSlice";
import ButtonContent from "../ComponentsFunction/ButtonContent";
import AnchorContent from "../ComponentsFunction/AnchorContent";
import LabelContent from "../ComponentsFunction/LabelContent";
import TextAreaContent from "../ComponentsFunction/TextAreaContent";
import InputContent from "../ComponentsFunction/InputContent";
import DivContent from "../ComponentsFunction/DivContent";
import SelectContent from "../ComponentsFunction/SelectContent";
import HeadingContent from "../ComponentsFunction/HeadingContent";
const ComponentEditorContent = ({ id , toast }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();

  const handleContentChange = (property, value) => {
    dispatch(setContent({ id, property, value }));
  };

  const handleAttributeChange = (property, value) => {
    dispatch(setAttribute({ id, property, value }));
  };

  const updateGridStyles = (property, value) => {
    dispatch(setProperty({ id, property, value }));
  };
  const handleStyleChange = (property, value) => {
    dispatch(setProperty({ id, property, value }));
  };
  const handleHtmlAttributes = (property, value) => {
    dispatch(setHtmlAttributes({ id, property, value }));
  };
  return (
    <div className="p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-editor">
      <h3 className="text-xl font-semibold text-gray-700">
        Content Properties
      </h3>
      {/* Textarea Content */}
      {element.type === "textarea" && (<TextAreaContent handleContentChange={handleContentChange} element={element} />)}
      {/* Anchor Content */}
      {element.type === "a" && (<AnchorContent handleContentChange={handleContentChange} handleStyleChange={handleStyleChange} handleAttributes={handleAttributeChange} element={element} />)}
      {/* Input Placeholder */}
      {element.type === "input" && (<InputContent handleContentChange={handleContentChange} element={element} />)}
      {/* Button Content */}
      {element.type === "button" && (<ButtonContent handleContentChange={handleContentChange} handleHtmlAttributes={handleHtmlAttributes} element={element} toast={toast} />)}
      {/* Label Content */}
      {element.type === "label" && (<LabelContent handleContentChange={handleContentChange} element={element} />)}  
      {/* Layout Options */}
      {element.type === "div" && (<DivContent handleContentChange={handleContentChange} handleStyleChange={handleStyleChange} element={element} />)}
      {/* Select Options (Work in Progress) */}
      {element.type === "select" && (<SelectContent></SelectContent>)}
      {/* Heading Content */}
      {element.type === "h1" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}
      {element.type === "h2" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}
      {element.type === "h3" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}
      {element.type === "h4" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}
      {element.type === "h5" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}  
      {element.type === "h6" && (<HeadingContent handleContentChange={handleContentChange} element={element} />)}
    </div>
  )
}
export default ComponentEditorContent;
