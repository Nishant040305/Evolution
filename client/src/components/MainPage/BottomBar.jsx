import { useState, useEffect } from 'react';
import { Timer, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BottomBar = () => {
  const { projectID } = useParams();
  const project = useSelector((state) => state.user.userInfo.projects);
  const webElements = useSelector((state) => state.webElement.present);

  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    console.log('Not implemented');
  };

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    const { clientY } = event;
    if (clientY >= window.innerHeight - 100) {
      // Adjust threshold as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } bg-gray-100 border-t border-gray-300 h-14`}
    >
      {/* Left side with Canvas details */}
      <div className="flex items-center justify-between px-6 text-sm text-gray-700">
        <span>Canvas Size: 1920 x 1080</span>
        <span>Zoom: 100%</span>

        {/* Right side with actions */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <Timer className="w-5 h-5 mr-1" />
            <span className="text-sm">Auto-save enabled</span>
          </button>

          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-rose-500 hover:bg-rose-600"
            onClick={handleSave}
          >
            <Save className="w-5 h-5 mr-1" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
