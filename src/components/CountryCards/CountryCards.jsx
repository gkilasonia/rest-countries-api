import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import "./CountryCards.css";

function CountryCards({ isDarkMode, selectedRegion, onCountryClick }) {
  const { data } = useContext(AppContext);

  let filteredCountries = data;
  if (selectedRegion) {
    filteredCountries = data.filter(
      (country) =>
        country.region &&
        country.region.toLowerCase() === selectedRegion.toLowerCase(),
    );
  }

  // If no region selected, show the original static set
  const displayCountries = selectedRegion
    ? filteredCountries
    : [97, 175, 191, 130, 159, 194, 56, 114].map((index) => data[index]);

  // Handler to pass country data up
  const handleCountryClick = (country) => {
    if (typeof onCountryClick === "function") {
      onCountryClick(country);
    }
  };

  return (
    <section className="countryCardsContainer">
      {displayCountries.map((country) => (
        <button
          type="button"
          className={
            "staticCountryCardsContainer" +
            (isDarkMode ? " countryCardsDarkMode950" : "")
          }
          key={country.name.common}
          onClick={() => handleCountryClick(country)}
          aria-label={`View details for ${country.name.common}`}
        >
          <div
            className={
              "staticCountryCard" +
              (isDarkMode ? " countryCardsDarkMode900" : "")
            }
          >
            <img
              className="countryFlag"
              src={country.flags.svg}
              alt={country.flags.alt || country.name.common}
            />
            <div className="countryCardDetails">
              <h2
                className={
                  "countryName" + (isDarkMode ? " countryCardsDarkMode900" : "")
                }
              >
                {country.name.common}
              </h2>
              <div className="countryDetails">
                <p className="countryPopulation">
                  <span className="population">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p className="countryRegion">
                  <span className="region">Region:</span> {country.region}
                </p>
                <p className="countryCapital">
                  <span className="capital">Capital:</span>{" "}
                  {Array.isArray(country.capital)
                    ? country.capital.join(", ")
                    : country.capital || "-"}
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </section>
  );
}

export default CountryCards;
