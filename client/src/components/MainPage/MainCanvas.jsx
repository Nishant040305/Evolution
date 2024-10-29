import { useEffect, useState } from "react";
import ComponentRenderer from "./ComponentRenderer";
import { redirect } from "react-router-dom";

const MainCanvas = () => {
  const [components, setComponents] = useState([]);

  const toHTML = () => {
    return document.getElementById("canvas").innerHTML;
  }

  useEffect(() => {
    /* get saved components from api here */

    const testComponents = [
      {
        type: 'a',
        position: { x: 50, y: 50 },
        styles: { padding: '10px' },
        attributes: {},
        content: 'Test Button',
      },
      {
        type: 'button',
        position: { x: 100, y: 100 },
        styles: { padding: '10px' },
        attributes: {
          onClick: () => alert(toHTML())
        },
      }
    ];

    setComponents(testComponents);
  }, []);

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div id="canvas" className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg h-96 relative">
          {components.length == 0 ? <p className="text-gray-500">Drag and drop elements here</p> : null}
          {components.map((component, index) => (
            <ComponentRenderer key={index} instance={component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
