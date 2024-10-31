import React from 'react';

function ComponentEditor({ id, webElements, setWebElements }) {
  const element = webElements[id];

  // Handle changes for non-style properties (content, position)
  const handleInputChange = (property, value) => {
    setWebElements((prevWebElements) => ({
      ...prevWebElements,
      [id]: {
        ...prevWebElements[id],
        [property]: value,
      },
    }));
  };

  // Handle changes for style properties
  const handleStyleChange = (styleProp, value) => {
    setWebElements((prevWebElements) => ({
      ...prevWebElements,
      [id]: {
        ...prevWebElements[id],
        styles: {
          ...prevWebElements[id].styles,
          [styleProp]: value,
        },
      },
    }));
  };

  return (
    <div>
      {id !== 0 && element ? (
        <div>
          <h3>Properties</h3>

          <label>Content:</label>
          <input
            type="text"
            value={element.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
          />

          <h3>Position</h3>

          <label>Position X:</label>
          <input
            type="number"
            value={element.position.x}
            onChange={(e) =>
              setWebElements((prevWebElements) => ({
                ...prevWebElements,
                [id]: {
                  ...prevWebElements[id],
                  position: {
                    ...prevWebElements[id].position,
                    x: parseInt(e.target.value),
                  },
                },
              }))
            }
          />

          <label>Position Y:</label>
          <input
            type="number"
            value={element.position.y}
            onChange={(e) =>
              setWebElements((prevWebElements) => ({
                ...prevWebElements,
                [id]: {
                  ...prevWebElements[id],
                  position: {
                    ...prevWebElements[id].position,
                    y: parseInt(e.target.value),
                  },
                },
              }))
            }
          />

          <h3>Styles</h3>

          <label>Background Color:</label>
          <input
            type="color"
            value={element.styles.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />

          <label>Text Color:</label>
          <input
            type="color"
            value={element.styles.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />

          <label>Padding:</label>
          <input
            type="text"
            value={element.styles.padding}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
          />

          <label>Border Width:</label>
          <input
            type="number"
            value={parseInt(element.styles.borderWidth)}
            onChange={(e) => handleStyleChange('borderWidth', `${e.target.value}px`)}
          />

          <label>Border Color:</label>
          <input
            type="color"
            value={element.styles.borderColor}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
          />

          <label>Border Style:</label>
          <select
            value={element.styles.borderStyle}
            onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>

          <label>Border Radius:</label>
          <input
            type="number"
            value={parseInt(element.styles.borderRadius)}
            onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
          />

          <label>Font Size:</label>
          <input
            type="number"
            value={parseInt(element.styles.fontSize)}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
          />

          <label>Font Weight:</label>
          <select
            value={element.styles.fontWeight}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </select>

          <label>Cursor:</label>
          <select
            value={element.styles.cursor}
            onChange={(e) => handleStyleChange('cursor', e.target.value)}
          >
            <option value="pointer">Pointer</option>
            <option value="default">Default</option>
            <option value="move">Move</option>
            <option value="text">Text</option>
          </select>

          <label>Letter Spacing:</label>
          <input
            type="number"
            value={parseInt(element.styles.letterSpacing)}
            onChange={(e) => handleStyleChange('letterSpacing', `${e.target.value}px`)}
          />

          <label>Transition:</label>
          <input
            type="text"
            value={element.styles.transition}
            onChange={(e) => handleStyleChange('transition', e.target.value)}
          />

          <label>Box Shadow:</label>
          <input
            type="text"
            value={element.styles.boxShadow}
            onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
          />

          <label>Transform:</label>
          <input
            type="text"
            value={element.styles.transform}
            onChange={(e) => handleStyleChange('transform', e.target.value)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ComponentEditor;
