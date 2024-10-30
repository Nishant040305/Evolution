import React, { useState } from 'react';

function ComponentEditor({ id, webElements, setWebElements }) {
  const element = webElements[id];

  const handleInputChange = (property, value) => {
    setWebElements((prevWebElements) => ({
      ...prevWebElements,
      [id]: {
        ...prevWebElements[id],
        [property]: value,
      },
    }));
  };

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
          
          <label>ID:</label>
          <input
            type="text"
            value={element.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
          />

          <label>Type:</label>
          <input
            type="text"
            value={element.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
          />

          <label>Background Color:</label>
          <input
            type="color"
            value={element.styles.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />

          <label>Content:</label>
          <input
            type="text"
            value={element.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
          />

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
        </div>
      ) : null}
    </div>
  );
}

export default ComponentEditor;
