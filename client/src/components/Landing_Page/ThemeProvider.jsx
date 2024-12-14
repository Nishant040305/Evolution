import { createContext, useContext, useEffect, useState } from "react";

// Create the context with a default value of undefined
const ThemeProviderContext = createContext(undefined);

function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setTheme] = useState(defaultTheme);

  // Effect to change the theme on document root
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to use the theme context
function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Default export for ThemeProvider
export default ThemeProvider;

// Named export for useTheme
export { useTheme };
