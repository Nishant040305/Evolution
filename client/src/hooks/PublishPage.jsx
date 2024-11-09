import { useSelector } from "react-redux";
import ApiDashboard from "../scripts/API.Dashboard";

const PublishPage = ( { css, js } ) => {
  const webElements = useSelector(state => state.webElement.present);
  const project = useSelector(state => state.project);
  const apiDashboard = new ApiDashboard();

  const getProjectId = () => project._id;

  const saveProject = () => {
    if (webElements) {
      apiDashboard.updateProjectComponents(getProjectId(), webElements);
    }
  }

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

  const download = () => {
    saveProject();
    const htmlContent = getHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = 'canvas.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      alert("Failed to publish content. Please try again.");
    }
  };

  return {
    preview,
    download,
    publish
  };
};

export default PublishPage;