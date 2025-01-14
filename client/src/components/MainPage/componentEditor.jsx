import React from 'react';

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
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-lg">
      {id !== 0 && element ? (
        <>
          <h3 className="text-xl font-semibold">Properties</h3>

          {/* Content */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Content:</label>
            <input
              type="text"
              value={element.content || ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter content"
            />
          </div>

          {/* Position */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Position</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Position X:
                </label>
                <input
                  type="number"
                  value={element.position.x || 0}
                  onChange={(e) =>
                    handleInputChange('position', {
                      ...element.position,
                      x: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Position Y:
                </label>
                <input
                  type="number"
                  value={element.position.y || 0}
                  onChange={(e) =>
                    handleInputChange('position', {
                      ...element.position,
                      y: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Styles */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Styles</h3>
            <div className="space-y-4">
              {/* Background Color */}
              <div>
                <label className="block font-medium text-gray-700">
                  Background Color:
                </label>
                <input
                  type="color"
                  value={element.styles.backgroundColor || '#ffffff'}
                  onChange={(e) =>
                    handleStyleChange('backgroundColor', e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Text Color */}
              <div>
                <label className="block font-medium text-gray-700">
                  Text Color:
                </label>
                <input
                  type="color"
                  value={element.styles.color || '#000000'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Other styles */}
              {[
                { label: 'Padding', style: 'padding' },
                {
                  label: 'Border Width',
                  style: 'borderWidth',
                  type: 'number',
                  suffix: 'px',
                },
                { label: 'Border Color', style: 'borderColor', type: 'color' },
                {
                  label: 'Border Radius',
                  style: 'borderRadius',
                  type: 'number',
                  suffix: 'px',
                },
                {
                  label: 'Font Size',
                  style: 'fontSize',
                  type: 'number',
                  suffix: 'px',
                },
                {
                  label: 'Letter Spacing',
                  style: 'letterSpacing',
                  type: 'number',
                  suffix: 'px',
                },
              ].map(({ label, style, type = 'text', suffix = '' }) => (
                <div key={style}>
                  <label className="block font-medium text-gray-700">
                    {label}:
                  </label>
                  <input
                    type={type}
                    value={parseInt(element.styles[style]) || ''}
                    onChange={(e) =>
                      handleStyleChange(style, `${e.target.value}${suffix}`)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}

              {/* Select elements for dropdown styles */}
              {[
                {
                  label: 'Border Style',
                  style: 'borderStyle',
                  options: ['solid', 'dashed', 'dotted', 'double'],
                },
                {
                  label: 'Font Weight',
                  style: 'fontWeight',
                  options: ['normal', 'bold', 'bolder', 'lighter'],
                },
                {
                  label: 'Cursor',
                  style: 'cursor',
                  options: ['pointer', 'default', 'move', 'text'],
                },
              ].map(({ label, style, options }) => (
                <div key={style}>
                  <label className="block font-medium text-gray-700">
                    {label}:
                  </label>
                  <select
                    value={element.styles[style] || options[0]}
                    onChange={(e) => handleStyleChange(style, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Text inputs for miscellaneous properties */}
              {['transition', 'boxShadow', 'transform'].map((style) => (
                <div key={style}>
                  <label className="block font-medium text-gray-700">
                    {style.charAt(0).toUpperCase() + style.slice(1)}:
                  </label>
                  <input
                    type="text"
                    value={element.styles[style] || ''}
                    onChange={(e) => handleStyleChange(style, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ComponentEditor;
