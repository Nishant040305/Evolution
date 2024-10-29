import { useEffect, useState } from "react";
import ComponentRenderer from "./ComponentRenderer";

const MainCanvas = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    /* get saved components from api here */

    const testComponents = [
      {
        type: 'button',
        position: { x: 50, y: 50 },
        styles: { padding: '10px' },
        attributes: {},
        content: 'Test Button',
      },
    ];

    setComponents(testComponents);
  }, []);

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg h-96 relative">
          <p className="text-gray-500">Drag and drop elements here</p>
          {components.map((component, index) => (
            <ComponentRenderer key={index} instance={component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
