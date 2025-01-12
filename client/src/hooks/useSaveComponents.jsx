import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ApiDashboard from "../scripts/API.Dashboard";

export const useSaveComponents = (toast, webElementsRef) => {
  const API = new ApiDashboard();
  const { projectID } = useParams();

  const updateWebElements = () => {
    // Create a copy of webElements with updated dimensions
    const updatedElements = JSON.parse(JSON.stringify(webElementsRef.current));
    
    Object.keys(webElementsRef.current).forEach((key) => {
        const element = document.getElementById("canvas-element " + key);
        const { height, width } = element.getBoundingClientRect();
        console.log(height, width);

        updatedElements[key].styles = {
        ...updatedElements[key].styles || {},
        height,
        width,
        };
    });
    
    return updatedElements;
  };

  const handleSaveCallback = useCallback(async () => {
    try {
      const response = await API.updateProjectComponents(projectID, updateWebElements());
      console.log('Components Saved:', response);
      toast.success("Components Saved!");
    } catch (error) {
      console.error("Failed to save by Ctrl+S:", error);
    }
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Ctrl+S pressed');
        handleSaveCallback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
    };
  }, []);
}