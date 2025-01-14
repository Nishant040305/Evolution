import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setElement } from '../Store/webElementSlice';
import { setProject } from '../Store/projectSlice';
import { setData } from '../Store/imageSlice';
import ApiDashboard from '../scripts/API.Dashboard';

export const useProjectData = (setFile, projectID, reloadEvents) => {
  const dispatch = useDispatch();
  const API = useMemo(() => new ApiDashboard(), []);

  const fetchProject = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
      dispatch(setElement(projectComp.components));
      dispatch(setData(projectComp.media));
      dispatch(setProject(projectComp));
      setFile(projectComp.files.find((f) => f.name === 'index.html'));
      reloadEvents();
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    if (projectID) fetchProject();
  }, [projectID]);
};
