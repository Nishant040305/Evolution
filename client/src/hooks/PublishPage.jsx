import { useSelector } from "react-redux";
import ApiDashboard from "../scripts/API.Dashboard";
import useSaveProject from "../hooks/useSaveProject";

const PublishPage = ( { css, js ,toast} ) => {
  const webElements = useSelector(state => state.webElement.present);
  const project = useSelector(state => state.project);
  const apiDashboard = new ApiDashboard();

  const getProjectId = () => project._id;

  const { saveProject } = useSaveProject();

  const getHTMLContent = () => {
    let htmlContent = document.getElementById("canvas").innerHTML;

    htmlContent = htmlContent.replace(/draggable="true"/g, "").replace(
      /(id="canvas-element (\d+)")/g,
      (match, p1, p2) => {
        if (webElements[p2]?.HTMLAttributes === undefined) {
          console.log(p1, "HTML ATTRIBUTES NOT FOUND");
          return match;
        }
        return `${p1} ` +
          Object.keys(webElements[p2].HTMLAttributes)
            .map(key => `${key}="${webElements[p2].HTMLAttributes[key]}"`).join(" ");
      }
    );

    return htmlContent;
  };

  const preview = () => {
    const htmlContent = getHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank", "Preview");
    URL.revokeObjectURL(url);
  };

  const download = async () => {
    saveProject();
    try {
      const response = await apiDashboard.downloadProject(getProjectId());
      console.log("Downloaded project:", response);
      const blob = new Blob([response], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = `${getProjectId()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download project:", error);
      toast.error("Failed to download project. Have you published it yet?");
    }
  };

  const publish = async () => {
    saveProject();
    const htmlContent = getHTMLContent();
    const id = getProjectId();

    try {
      const res = await apiDashboard.publishProject(id, htmlContent, css, js);
      console.log(res);
      window.open(`${import.meta.env.VITE_REACT_APP_BACKWEB}/${res.data.domain}`, "_blank");
    } catch (error) {
      console.error("Failed to publish content:", error);
      toast.error("Failed to publish content. Please try again.");
    }
  };

  const saveAllChanges = async () => {
    saveProject();
    const htmlContent = getHTMLContent();
    const id = getProjectId();

    try {
      await apiDashboard.publishProject(id, htmlContent, css, js);
    } catch (error) {
      console.error("Failed to save content:", error);
      toast.error("Failed to save content. Please try again.");
    }
  };

  return {
    preview,
    download,
    publish,
    saveAllChanges,
  };
};

export default PublishPage;
