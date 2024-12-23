import { useState, useCallback } from 'react';
import ApiDashboard from "../scripts/API.Dashboard";
import { useSelector } from "react-redux";

const useSaveFile = (text, file) => {
  const apiDashboard = new ApiDashboard();
  const project = useSelector(state => state.project);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleSave = useCallback(async () => {
    try {
      const response = await apiDashboard.updateProjectFile(project._id, file.name, { content: text });
      console.log('Text Saved:', response);
      setChangesSaved(true);
      setTimeout(() => setChangesSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save Text:", error);
    }
  }, [apiDashboard, text, file.name, project._id]);

  return { handleSave, changesSaved };
};

export default useSaveFile;
