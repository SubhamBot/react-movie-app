import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkMode = () => {
  // Load dark mode preference from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Function to apply or remove dark classes
  const applyDarkMode = (enable: boolean) => {
    const myDiv = document.getElementById("1");
    const myHeader = document.getElementById("2");
    const myCards = document.querySelectorAll(".cards");
    const myBackgr = document.getElementById("fav");

    if (enable) {
      document.documentElement.classList.add("dark");
      myDiv?.classList.add("dark");
      myBackgr?.classList.add("dark");
      myHeader?.classList.add("dark");
      myCards.forEach((card) => card.classList.add("dark"));
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      myBackgr?.classList.remove("dark");
      myDiv?.classList.remove("dark");
      myHeader?.classList.remove("dark");
      myCards.forEach((card) => card.classList.remove("dark"));
      localStorage.setItem("theme", "light");
    }
  };

  // Apply dark mode on initial load and state change
  useEffect(() => {
    applyDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Ensure new elements (e.g., infinite scroll) receive the dark class
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (localStorage.getItem("theme") === "dark") {
        document.querySelectorAll(".cards").forEach((card) => {
          card.classList.add("dark");
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Toggle dark mode state
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default DarkMode;

