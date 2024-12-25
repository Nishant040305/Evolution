import { useState, useCallback } from 'react';
import ApiDashboard from "../scripts/API.Dashboard";

const useSaveComponents = (pid, toast, webElementsRef) => {
  const apiDashboard = new ApiDashboard();

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
      const response = await apiDashboard.updateProjectComponents(pid, updateWebElements());
      console.log('Components Saved:', response);
      toast.success("Components Saved!");
    } catch (error) {
      console.error("Failed to save by Ctrl+S:", error);
    }
  }, [apiDashboard, pid]);

  return { handleSaveCallback };
}

export default useSaveComponents;