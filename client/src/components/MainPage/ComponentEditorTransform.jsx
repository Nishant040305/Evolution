import React, { useState } from 'react';
import { ChevronDown,ChevronUp } from 'lucide-react';
const ComponentEditorTransform = ({ id, webElements, setWebElements }) => {
  const[on,setOFF] = useState(0);
  const element = webElements[id];
  const handleTransformChange = (property, value) => {
    setWebElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        styles: {
          ...prev[id].styles,
          [property]:value,
        },
      },
    }));
  };
  
  // Function to handle rotation
  const handleRotationChange = (value) => {
    const currentTransform = element.styles.transform || '';
    const updatedTransform = `${currentTransform.replace(/rotate\([^)]+\)/, '')} rotate(${value}deg)`;
    setWebElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        styles: {
          ...prev[id].styles,
          transform: updatedTransform,
        },
      },
    }));
  };

  // Function to handle reflection (horizontal or vertical)
  const handleReflectionChange = (direction) => {
    const currentTransform = element.styles.transform || '';
    let reflectionTransform = '';

    if (direction === 'horizontal') {
      reflectionTransform = 'scaleX(-1)';
    } else if (direction === 'vertical') {
      reflectionTransform = 'scaleY(-1)';
    }

    const updatedTransform = `${currentTransform.replace(/scale[XY]\(-1\)/, '')} ${reflectionTransform}`;
    setWebElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        styles: {
          ...prev[id].styles,
          transform: updatedTransform,
        },
      },
    }));
  };

  return (
    <div className="properties-transform p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="font-semibold text-lg">Transform Properties <button onClick={() => setOFF((prev) => !prev)}>
                  {on ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button></h3>
      {on?<>
      {/* Rotation */}
      <label>
        Rotation (deg):
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleRotationChange(e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      {/* X Position */}
      <label>
        X Position:
        <input
          type="number"
          value={element.position.x}
          onChange={(e) =>
            setWebElements((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                position: { ...prev[id].position, x: parseInt(e.target.value) },
              },
            }))
          }
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

      {/* Y Position */}
      <label>
        Y Position:
        <input
          type="number"
          value={element.position.y}
          onChange={(e) =>
            setWebElements((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                position: { ...prev[id].position, y: parseInt(e.target.value) },
              },
            }))
          }
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>

    {/* Width */}
    <label>
      Width:
      <input
        type="number"
        value={element.styles.width ? parseInt(element.styles.width) : ''}
        onChange={(e) => {
          const value = e.target.value;
          handleTransformChange('width', value ? `${value}px` : 'auto');
        }}
        className="ml-2 p-1 border border-gray-300 rounded"
        placeholder="auto"
      />
    </label>

    {/* Height */}
    <label>
      Height:
      <input
        type="number"
        value={element.styles.height ? parseInt(element.styles.height) : ''}
        onChange={(e) => {
          const value = e.target.value;
          handleTransformChange('height', value ? `${value}px` : 'auto');
        }}
        className="ml-2 p-1 border border-gray-300 rounded"
        placeholder="auto"
      />
    </label>


      {/* Reflection */}
      <label>
        Reflection:
        <select
          onChange={(e) => handleReflectionChange(e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="">None</option>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </label>

      {/* Border Radius */}
      <h4 className="font-semibold mt-3">Border Radius</h4>
      <div className="grid grid-cols-2 gap-2">
        {['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'].map((corner) => (
          <label key={corner}>
            {corner.charAt(0).toUpperCase() + corner.slice(1)}:
            <input
              value={parseInt(element.styles[`border${corner}Radius`]) || 0}
              onChange={(e) => handleTransformChange(`border${corner}Radius`, `${e.target.value}px`)}
              className="ml-2 p-1 border border-gray-300 rounded"
            />
          </label>
        ))}
      </div>
      </>:<></>}
    </div>
  );
};

export default ComponentEditorTransform;
