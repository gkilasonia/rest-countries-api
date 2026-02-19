import { useContext } from "react";
import arrowLight from "../../assets/images/call-made.svg";
import arrowDark from "../../assets/images/white-call-made.svg";
import { AppContext } from "../../context/AppContext.jsx";
import "./CountryInfo.css";

const CountryInfo = ({ country, onBack }) => {
  const { isDarkMode } = useContext(AppContext);
  // Helper functions for currencies, languages, borders
  const getNativeName = () => {
    if (country.name.nativeName) {
      const nativeNames = Object.values(country.name.nativeName);
      return nativeNames[0]?.common || country.name.common;
    }
    return country.name.common;
  };
  const getCurrencies = () =>
    country.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "-";
  const getLanguages = () =>
    country.languages ? Object.values(country.languages).join(", ") : "-";
  const getBorders = () => country.borders || [];

  return (
    <section className="country-info-container">
      <button
        className={"back-button" + (isDarkMode ? " darkModeBtn" : "")}
        onClick={onBack}
      >
        <img
          src={isDarkMode ? arrowDark : arrowLight}
          alt="Back arrow"
          className="arrow-icon"
        />
        Back
      </button>
      <div className="country-details-wrapper">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={country.name.common}
          className="country-flag"
        />
        <div
          className={"country-details" + (isDarkMode ? " darkModeDetails" : "")}
        >
          <h2 className="country-name">{country.name.common}</h2>
          <div className="country-details-info">
            <div className="country-main-details">
              <p className="country-native-name">
                Native Name:{" "}
                <span className="country-native-name-value">
                  {getNativeName()}
                </span>
              </p>
              <p className="country-population">
                Population:{" "}
                <span className="country-population-value">
                  {country.population?.toLocaleString() || "-"}
                </span>
              </p>
              <p className="country-region">
                Region:{" "}
                <span className="country-region-value">{country.region}</span>
              </p>
              <p className="country-subregion">
                Sub Region:{" "}
                <span className="country-subregion-value">
                  {country.subregion || "-"}
                </span>
              </p>
              <p className="country-capital">
                Capital:{" "}
                <span className="country-capital-value">
                  {country.capital?.join(", ") || "-"}
                </span>
              </p>
            </div>
            <div className="country-extra-details">
              <p className="country-tld">
                Top Level Domain:{" "}
                <span className="country-tld-value">
                  {country.tld?.join(", ") || "-"}
                </span>
              </p>
              <p className="country-currencies">
                Currencies:{" "}
                <span className="country-currencies-value">
                  {getCurrencies()}
                </span>
              </p>
              <p className="country-languages">
                Languages:{" "}
                <span className="country-languages-value">
                  {getLanguages()}
                </span>
              </p>
            </div>
            <div className="country-borders-wrapper">
              <p className="country-borders-label">Border Countries:</p>
              <div className="country-borders-list">
                {getBorders().length > 0 ? (
                  getBorders().map((border) => (
                    <p
                      className={
                        "country-border" + (isDarkMode ? " darkModeBorder" : "")
                      }
                      key={border}
                    >
                      {border}
                    </p>
                  ))
                ) : (
                  <p
                    className={
                      "country-border" + (isDarkMode ? " darkModeBorder" : "")
                    }
                  >
                    None
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryInfo;
