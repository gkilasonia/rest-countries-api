import React, { useState } from "react";
import { AppContext } from "../src/context/AppContext.jsx";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header/Header.jsx";
import FilterBar from "./components/FilterBar/FilterBar.jsx";
import CountryCards from "./components/CountryCards/CountryCards.jsx";
import CountryInfo from "./components/CountryInfo/CountryInfo.jsx";
import "./index.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch(
        "https://restcountries.com/v3.1/all?fields=name,nativeName,population,region,flags,capital,tld,currencies,languages,borders",
      ).then((res) => res.json()),
  });

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      data,
    }),
    [isDarkMode, data],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!Array.isArray(data)) return <div>No data found.</div>;

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleCountrySuggestion = (countryName) => {
    const country = data.find(
      (c) => c.name && c.name.common && c.name.common === countryName,
    );
    if (country) {
      setSelectedCountry(country);
      setShowCountryInfo(true);
    }
  };

  const handleBack = () => {
    setShowCountryInfo(false);
    setSelectedCountry(null);
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Header toggleDarkMode={toggleDarkMode} />

      <main className={isDarkMode ? "mainDarkMode" : ""}>
        {!showCountryInfo && (
          <>
            <FilterBar
              onRegionSelect={handleRegionSelect}
              onCountrySuggestion={handleCountrySuggestion}
            />
            <CountryCards
              isDarkMode={isDarkMode}
              selectedRegion={selectedRegion}
              onCountryClick={(country) => {
                setSelectedCountry(country);
                setShowCountryInfo(true);
              }}
            />
          </>
        )}
        {showCountryInfo && selectedCountry && (
          <CountryInfo country={selectedCountry} onBack={handleBack} />
        )}
      </main>
    </AppContext.Provider>
  );
}

export default App;
