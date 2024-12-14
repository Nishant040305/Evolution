import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 50,
        backgroundColor: "#3b82f6", // Apply your color here
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        display: "flex",
        alignItems: "center",
        border: "none",
        cursor: "pointer",
      }}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
