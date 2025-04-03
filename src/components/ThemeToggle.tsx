
import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false; // Default to light mode for Uber-like aesthetic
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
      className="fixed top-4 right-4 p-2 rounded-full bg-white shadow-md dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-uber-blue focus:ring-offset-2 dark:focus:ring-offset-black"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={20} aria-hidden="true" className="text-uber-blue" />
      ) : (
        <Moon size={20} aria-hidden="true" className="text-uber-blue" />
      )}
      <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
};

export default ThemeToggle;
