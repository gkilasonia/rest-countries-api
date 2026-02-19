import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import "./FilterBar.css";

function FilterBar({ onSearch, onRegionSelect, onCountrySuggestion }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const { data: countries, isDarkMode } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch && onSearch(value);
    if (value.length > 0 && Array.isArray(countries)) {
      const filtered = countries
        .map((c) => c.name?.common)
        .filter(
          (name) => name && name.toLowerCase().includes(value.toLowerCase()),
        );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchValue(name);
    setShowSuggestions(false);
    if (onCountrySuggestion) {
      onCountrySuggestion(name);
    }
  };

  return (
    <section className="filter-controls">
      {/* 1. Search Field */}
      <div
        className={
          "search-wrapper search-wrapper-relative" +
          (isDarkMode ? " darkModeInput" : "")
        }
      >
        <label htmlFor="search-input-field" className="visually-hidden">
          Search for a country
        </label>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          id="search-input-field"
          className={
            "search-input-field" + (isDarkMode ? " darkModeInput" : "")
          }
          name="search-input-field"
          type="search"
          placeholder="Search for a country…"
          value={searchValue}
          onChange={handleInputChange}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="country-suggestions"
          aria-expanded={showSuggestions}
          aria-activedescendant={
            showSuggestions && suggestions.length > 0
              ? `suggestion-${suggestions[0]}`
              : undefined
          }
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            id="country-suggestions"
            className={
              "autocomplete-suggestions" + (isDarkMode ? " darkModeUl" : "")
            }
            ref={suggestionsRef}
            role="listbox"
          >
            {suggestions.map((name) => (
              <li
                key={name}
                id={`suggestion-${name}`}
                className={
                  "autocomplete-suggestion" +
                  (isDarkMode ? " darkModeOption" : "")
                }
                onClick={() => handleSuggestionClick(name)}
                role="option"
                tabIndex={0}
                aria-selected={false}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. Region Filter */}
      <div
        className={"dropdown-wrapper" + (isDarkMode ? " darkModeSelect" : "")}
      >
        <label htmlFor="dropdown-menu" className="visually-hidden">
          Filter by Region
        </label>
        <select
          id="dropdown-menu"
          className={"dropdown-menu" + (isDarkMode ? " darkModeSelect" : "")}
          name="dropdown-menu"
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value;
            onRegionSelect && onRegionSelect(value);
          }}
        >
          <option value="" disabled hidden>
            Filter by Region
          </option>
          {regions.map((region) => (
            <option
              key={region}
              value={region}
              className={isDarkMode ? "darkModeOption" : ""}
            >
              {region}
            </option>
          ))}
        </select>
        <i className="fa-solid fa-chevron-down arrow-icon"></i>
      </div>
    </section>
  );
}

export default FilterBar;
