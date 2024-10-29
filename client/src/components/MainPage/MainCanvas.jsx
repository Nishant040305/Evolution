import { useEffect, useState } from "react";
import ComponentRenderer from "./ComponentRenderer";

const MainCanvas = () => {
  const [components, setComponents] = useState({});

  const toHTML = () => {
    return document.getElementById("canvas").innerHTML;
  };

  useEffect(() => {
    /* get saved components from api here */

    const testComponents = {
      '1': {
        id: '1',
        type: 'a',
        position: { x: 50, y: 50 },
        styles: { padding: '10px' },
        attributes: {},
        content: 'Test Text',
      },
      '2': {
        id: '2',
        type: 'button',
        position: { x: 100, y: 100 },
        styles: { padding: '10px' },
        attributes: {
          onClick: () => alert(toHTML())
        },
      },
      '3': {
        id: '3',
        type: 'button',
        position: { x: 300, y: 200 },
        styles: { padding: '10px' },
        attributes: {},
      }
    };

    setComponents(testComponents);
  }, []);

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div id="canvas" className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg h-96 relative">
          {Object.keys(components).length === 0 ? (
            <p className="text-gray-500">Drag and drop elements here</p>
          ) : null}
          {Object.values(components).map((component) => (
            <ComponentRenderer key={component.id} instance={component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
