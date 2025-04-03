
import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true; // Default to dark mode for Spotify-like aesthetic
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
      className="fixed top-4 right-4 p-2 rounded-full bg-spotify-light backdrop-blur-sm shadow-md dark:bg-spotify-gray/80 text-gray-300 dark:text-spotify-text hover:bg-spotify-light/90 dark:hover:bg-spotify-gray/90 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={20} aria-hidden="true" className="text-spotify-green" />
      ) : (
        <Moon size={20} aria-hidden="true" className="text-uber-blue" />
      )}
      <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
};

export default ThemeToggle;
