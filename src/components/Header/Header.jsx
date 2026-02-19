import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import "./Header.css";
import darkModeIcon from "../../assets/images/dark-mode-icon.png";
import lightModeIcon from "../../assets/images/light-mode-icon.png";

function Header({ toggleDarkMode }) {
  const { isDarkMode } = useContext(AppContext);

  return (
    <header className={"headerContainer" + (isDarkMode ? " darkMode" : "")}>
      <span className="headerHeading">Where in the world?</span>
      <button
        type="button"
        className="modeSwitcherBtn"
        aria-label={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <img className="modeIcon" src={lightModeIcon} alt="Light Mode Icon" />
        ) : (
          <img className="modeIcon" src={darkModeIcon} alt="Dark Mode Icon" />
        )}
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
