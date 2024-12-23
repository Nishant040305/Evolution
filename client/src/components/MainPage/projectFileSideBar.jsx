import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FileText, FileCode, Palette, Trash, Copy } from "lucide-react";
import ApiDashboard from "../../scripts/API.Dashboard";

const ProjectFileSideBar = ({ file, setFile, toast }) => {
  const { projectID } = useParams();
  const API = new ApiDashboard();

  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const projectComp = await API.getProjectById(projectID);
      const sortedFiles = projectComp.files.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFiles(sortedFiles);
    } catch (error) {
      toast.error("Failed to fetch project files.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [projectID]);

  const handleOpen = async (name) => {
    await fetchFiles();
    const selectedFile = files.find((f) => f.name === name);
    if (selectedFile) setFile(selectedFile);
  };

  const createFile = (name) => {
    if (files.some((f) => f.name === name)) {
      toast.error("File already exists!");
      return null;
    }

    const newfile = { name };
    if (name.endsWith(".html")) newfile.components = {};
    else newfile.content = "";

    return newfile;
  };

  const handleAdd = async () => {
    const name = window.prompt("Enter the name of the new file:");
    if (!name) return;

    const newfile = createFile(name);
    if (!newfile) return;

    try {
      await API.createProjectFile(projectID, newfile);
      await fetchFiles();
      if (files.some(f => f.name === name)) setFile(newfile);
      else throw new Error("Failed to add file.");
    } catch (error) {
      console.error("Failed to add file:", error);
      toast.error("Failed to create file.");
    }
  };

  const handleDelete = async (name) => {
    console.log("Deleting file:", name);
    const targetFile = files.find((f) => f.name === name);
    if (!targetFile) return;

    if (targetFile.useDefault) {
      toast.error("Cannot delete default file!");
      return;
    }

    try {
      await API.deleteProjectFile(projectID, name);
      await fetchFiles();
      if (file?.name === name) setFile(files.find((f) => f.name === "index.html"));
    } catch (error) {
      toast.error("Failed to delete file.");
    }
  };

  const handleCopy = async (name) => {
    console.log("Copying file:", name);
    const newname = window.prompt("Enter the name of the copied file:");
    if (!newname) return;

    const targetFile = files.find((f) => f.name === name);
    const newfile = createFile(newname);
    if (!targetFile || !newfile) return;

    newfile.components = targetFile.components;
    newfile.content = targetFile.content;
    if (targetFile.useDefault) toast.error("Components failed to copy.");

    try {
      await API.createProjectFile(projectID, newfile);
      await fetchFiles();
    } catch (error) {
      toast.error("Failed to copy file.");
    }
  };

  const renderFileName = (name) => {
    const parts = name.split("/");
    return (
      <>
        <span className="text-gray-500">{parts.slice(0, -1).join("/") + "/"}</span>
        <span className="text-gray-800 font-medium">{parts[parts.length - 1]}</span>
      </>
    );
  };

  const renderFileIcon = (name) => {
    if (name.endsWith(".html")) return <FileText className="w-5 h-5 text-orange-500" />;
    if (name.endsWith(".css")) return <Palette className="w-5 h-5 text-blue-500" />;
    if (name.endsWith(".js")) return <FileCode className="w-5 h-5 text-yellow-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Files</h2>
      <button
        onClick={handleAdd}
        className="w-full mb-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Create New File
      </button>
      <ul className="space-y-2">
        {files.map((f) => (
          <li
            key={f.name}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
              file?.name === f.name
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => handleOpen(f.name)}
          >
            <div className="flex items-center space-x-2">
              {renderFileIcon(f.name)}
              <div>{renderFileName(f.name)}</div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(f.name);
                }}
                className="p-2 text-blue-500 hover:text-blue-600"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(f.name);
                }}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectFileSideBar;
