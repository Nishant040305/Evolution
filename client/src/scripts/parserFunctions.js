export const parseOnClick = (onclickString) => {
    if (!onclickString) return { type: "custom", value: "" };
  
    if (onclickString.startsWith("alert(")) {
      const value = onclickString.match(/alert\(["'](.+?)["']\)/)?.[1] || "";
      return { type: "alert", value };
    }
  
    if (onclickString.startsWith("console.log(")) {
      const value = onclickString.match(/console\.log\(["'](.+?)["']\)/)?.[1] || "";
      return { type: "console.log", value };
    }
  
    if (onclickString.startsWith("window.location.href=")) {
      const value = onclickString.match(/window\.location\.href=['"](.+?)['"]/)?.[1] || "";
      return { type: "navigate", value };
    }
  
    // Fallback to custom for unrecognized strings
    return { type: "custom", value: onclickString };
  };
  