import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setElement } from "../Store/webElementSlice";

export const useFileHandler = (file, getDefaultComponents, setText, setRightSidebarOpen, setStatusCode) => {
  const dispatch = useDispatch();

    // Load file editor
    useEffect(() => {
        // load file editor
        if (file.name.endsWith(".html")) setStatusCode(0);
        else if (file.name.endsWith(".css")) setStatusCode(2);
        else if (file.name.endsWith(".js")) setStatusCode(1);
        else setStatusCode(3);
    
        // load file
        if (file.useDefault) {
          getDefaultComponents().then((components) => {
            dispatch(setElement(components));
            console.log("Loaded default");
          });
        }
        else if (file.name.endsWith(".html")) {
          dispatch(setElement(file.components));
          console.log("Loaded HTML");
        }
        else {
          setText(file.content);
          console.log("Loaded text");
        }
    
        // close right sidebar
        setRightSidebarOpen(false);
      }, [file])
};
