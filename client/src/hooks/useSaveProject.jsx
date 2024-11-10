import { useDispatch,useSelector } from "react-redux";
import ApiDashboard from "../scripts/API.Dashboard";
import { setProperty } from "../Store/webElementSlice";

const useSaveProject = () => {
  const webElements = useSelector(state => state.webElement.present);
  const project = useSelector(state => state.project);
  const apiDashboard = new ApiDashboard();
  const dispatch = useDispatch();

  const getProjectId = () => project._id;

  const updateWebElements = () => {
    // Create a copy of webElements with updated dimensions
    const updatedElements = JSON.parse(JSON.stringify(webElements));
    
    Object.keys(webElements).forEach((key) => {
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
  
  const saveProject = () => {
    if (webElements) {
      const updatedWebElements = updateWebElements();
      console.log(updatedWebElements);
      apiDashboard.updateProjectComponents(getProjectId(), updatedWebElements);
    }
  };
  

  return {
    saveProject,
  };
};

export default useSaveProject;
