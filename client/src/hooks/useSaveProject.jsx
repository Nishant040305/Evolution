import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../Store/webElementSlice";
import ApiDashboard from "../scripts/API.Dashboard";

const useSaveProject = (projectID) => {
  const API = new ApiDashboard();
  const webElements = useSelector((state) => state.webElement.present);
  const project = useSelector((state) => state.user.userInfo.projects);
  const dispatch = useDispatch();

  const updateWebElements = () => {
    Object.keys(webElements).forEach((key) => {
      const element = document.getElementById("canvas-element " + key);
      const { height, width } = element.getBoundingClientRect();
      dispatch(setProperty({ id: key, property: "height", value: height }));
      dispatch(setProperty({ id: key, property: "width", value: width }));
    });
  };

  const handleSave = () => {
    updateWebElements();
    if (webElements && project.includes(projectID)) {
      API.updateProjectComponents(projectID, webElements);
    }
  };

  return { handleSave };
};

export default useSaveProject;
