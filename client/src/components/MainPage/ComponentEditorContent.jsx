import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import {
  setAttribute,
  setContent,
  setProperty,
  setHtmlAttributes,
} from '../../Store/webElementSlice';
import ButtonContent from '../ComponentsFunction/ButtonContent';
import AnchorContent from '../ComponentsFunction/AnchorContent';
import LabelContent from '../ComponentsFunction/LabelContent';
import TextAreaContent from '../ComponentsFunction/TextAreaContent';
import InputContent from '../ComponentsFunction/InputContent';
import DivContent from '../ComponentsFunction/DivContent';
import SelectContent from '../ComponentsFunction/SelectContent';
import HeadingContent from '../ComponentsFunction/HeadingContent';
import ParagraphContent from '../ComponentsFunction/ParagraphContent';
import ArticleContent from '../ComponentsFunction/ArticleContent';
import SectionContent from '../ComponentsFunction/SectionContent';
import NavContent from '../ComponentsFunction/NavContent';
import FooterContent from '../ComponentsFunction/FooterContent';
import HeaderContent from '../ComponentsFunction/HeaderContent';
import ImgContent from '../ComponentsFunction/ImageContent';
const ComponentEditorContent = ({ id, toast }) => {
  const [on, setOFF] = useState(false);
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
      <h3 className="flex items-center justify-between text-lg font-semibold text-gray-800">
        Content Properties
        <button
          onClick={() => setOFF((prev) => !prev)}
          className="p-1 ml-2 text-gray-500 transition rounded hover:text-gray-700"
        >
          {on ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </h3>
      {on && (
        <>
          {/* Textarea Content */}
          {element.type === 'textarea' && (
            <TextAreaContent
              handleContentChange={handleAttributeChange}
              element={element}
            />
          )}
          {/* Anchor Content */}
          {element.type === 'a' && (
            <AnchorContent
              handleContentChange={handleContentChange}
              handleStyleChange={handleStyleChange}
              handleAttributes={handleAttributeChange}
              element={element}
            />
          )}
          {/* Input Placeholder */}
          {element.type === 'input' && (
            <InputContent
              handleContentChange={handleAttributeChange}
              element={element}
            />
          )}
          {/* Button Content */}
          {element.type === 'button' && (
            <ButtonContent
              handleContentChange={handleContentChange}
              handleHtmlAttributes={handleHtmlAttributes}
              element={element}
              toast={toast}
            />
          )}
          {/* Label Content */}
          {element.type === 'label' && (
            <LabelContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {/* Layout Options */}
          {element.type === 'div' && (
            <DivContent
              handleContentChange={handleContentChange}
              handleStyleChange={handleStyleChange}
              updateGridStyles={updateGridStyles}
              element={element}
            />
          )}
          {/* Select Options (Work in Progress) */}
          {element.type === 'select' && (
            <SelectContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {/* Heading Content */}
          {element.type === 'h1' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {element.type === 'h2' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {element.type === 'h3' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {element.type === 'h4' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {element.type === 'h5' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {element.type === 'h6' && (
            <HeadingContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {/* Paragraph Content */}
          {element.type === 'p' && (
            <ParagraphContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {/* Article Content */}
          {element.type === 'article' && (
            <ArticleContent
              handleContentChange={handleContentChange}
              element={element}
            />
          )}
          {/* Section Content */}
          {element.type === 'section' && (
            <SectionContent
              handleContentChange={handleContentChange}
              handleStyleChange={handleStyleChange}
              element={element}
            />
          )}
          {/* Nav Content */}
          {element.type === 'nav' && (
            <NavContent
              handleContentChange={handleContentChange}
              handleStyleChange={handleStyleChange}
              updateGridStyles={updateGridStyles}
              element={element}
            />
          )}
          {/* Footer Content */}
          {element.type === 'footer' && (
            <FooterContent
              handleContentChange={handleContentChange}
              updateGridStyles={updateGridStyles}
              handleStyleChange={handleStyleChange}
              element={element}
            />
          )}
          {/* Header Content */}
          {element.type === 'header' && (
            <HeaderContent
              handleContentChange={handleContentChange}
              updateGridStyles={updateGridStyles}
              handleStyleChange={handleStyleChange}
              element={element}
            />
          )}
          {/*Image Content */}
          {element.type === 'img' && (
            <ImgContent
              handleAttributeChange={handleAttributeChange}
              handleStyleChange={handleStyleChange}
              element={element}
            />
          )}
        </>
      )}
    </div>
  );
};
export default ComponentEditorContent;
