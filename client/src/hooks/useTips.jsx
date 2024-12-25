import { useEffect } from "react";
import { tips } from "../constants/Tips";

const useTips = (toast) => {
  useEffect(() => {
    toast.success(tips[Math.floor(Math.random() * tips.length)],
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  }, []);
}

export default useTips;