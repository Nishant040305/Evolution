import React, { useState } from 'react';
import { ChevronDown,ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setProperty } from '../../Store/webElementSlice';
const ComponentEditorAppearance = ({ id }) => {
  const element = webElements[id];
  const [on,setOFF] = useState(false);
  const webElements = useSelector(state=>state.webElement.present);
  const dispatch = useDispatch();
  const handleAppearanceChange = (property, value) => {
    dispatch(setProperty({id:id,property:property,value:value}));
  };

  const handlePaddingChange = (side, value) => {
    handleAppearanceChange(`padding${side}`, `${value}px`);
  };

  return (
    <div className="appearance-editor p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="font-semibold text-lg">Appearance Properties<button onClick={() => setOFF((prev) => !prev)}>
                  {on ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button></h3>

      {/* Color */}
      {on?<><label>
        Color:
        <input
          type="color"
          value={element.styles.color || '#000000'}
          onChange={(e) => handleAppearanceChange('color', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      {/* Background Color */}
      <label>
        Background Color:
        <input
          type="color"
          value={element.styles.backgroundColor || '#ffffff'}
          onChange={(e) => handleAppearanceChange('backgroundColor', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      {/* Font Size */}
      <label>
        Font Size:
        <input
          type="number"
          value={parseInt(element.styles.fontSize) || ''}
          onChange={(e) => handleAppearanceChange('fontSize', `${e.target.value}px`)}
          className="ml-2 p-1 border border-gray-300 rounded"
          placeholder="px"
        />
      </label>

      {/* Font Family */}
      <label>
        Font Family:
        <select
          value={element.styles.fontFamily || 'Arial'}
          onChange={(e) => handleAppearanceChange('fontFamily', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
      </label>

      {/* Font Weight */}
      <label>
        Font Weight:
        <select
          value={element.styles.fontWeight || 'normal'}
          onChange={(e) => handleAppearanceChange('fontWeight', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
          <option value="bolder">Bolder</option>
        </select>
      </label>

      {/* Text Align */}
      <label>
        Text Align:
        <select
          value={element.styles.textAlign || 'left'}
          onChange={(e) => handleAppearanceChange('textAlign', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </label>

      {/* Border Color */}
      <label>
        Border Color:
        <input
          type="color"
          value={element.styles.borderColor || '#000000'}
          onChange={(e) => handleAppearanceChange('borderColor', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      {/* Padding */}
      <h4 className="font-semibold mt-3">Padding</h4>
      <div className="grid grid-cols-2 gap-2">
        {['Top', 'Bottom', 'Left', 'Right'].map((side) => (
          <label key={side}>
            {side}:
            <input
              type="number"
              value={parseInt(element.styles[`padding${side}`]) || 0}
              onChange={(e) => handlePaddingChange(side, e.target.value)}
              className="ml-2 p-1 border border-gray-300 rounded"
            />
          </label>
        ))}
      </div></>:<></>}
    </div>
  );
};

export default ComponentEditorAppearance;
