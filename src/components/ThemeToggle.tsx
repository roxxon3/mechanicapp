
import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md dark:bg-black/80 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
      <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
};

export default ThemeToggle;
